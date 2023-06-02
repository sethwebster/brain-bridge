import { LLMChain, PromptTemplate } from "langchain";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { OpenAIChat } from "langchain/llms";
import { HNSWLib } from "langchain/vectorstores";
import fs from "fs";
import path from "path";
import invariant from "tiny-invariant";
import { prisma } from "~/server/db";
import { getTempFilePath } from "~/utils/files";

interface LangChainStorage {
  getIndex(id: string): Promise<HNSWLib>;
}

export interface LangChainStore {
  getLangChainResponse: (indexId: string, userPrompt: string, basePrompt: string, history: string[]) => Promise<string>;
}

const model = new OpenAIChat({
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'gpt-3.5-turbo'
});

export class BrainBridgeStorage implements LangChainStorage {
  async getIndex(id: string): Promise<HNSWLib> {
    console.log("Getting index for", id)
    const trainingIndex = await prisma.trainingIndex.findFirst({
      where: {
        trainingSetId: id
      }
    });
    invariant(trainingIndex, "Training index must exist");
    const { tempFilePath, indexPath, docStorePath, argsFilePath } = this.getFilePaths(id);
    fs.writeFileSync(indexPath, Buffer.from(trainingIndex.vectors));
    fs.writeFileSync(docStorePath, Buffer.from(trainingIndex.docStore));
    fs.writeFileSync(argsFilePath, `{"space":"cosine","numDimensions":1536}`);
    const index = await HNSWLib.load(tempFilePath, new OpenAIEmbeddings())
    return index;
  }

  private getFilePaths(id: string) {
    const tempFilePath = getTempFilePath('brainbridge-' + id, { mkdir: true });
    const indexPath = path.join(tempFilePath, `hnswlib.index`);
    const docStorePath = path.join(tempFilePath, `docstore.json`);
    const argsFilePath = path.join(tempFilePath, `args.json`);

    return {
      tempFilePath,
      indexPath,
      docStorePath,
      argsFilePath,
    }
  }
}

export interface LLMResponse {
  text: string;
}
export interface LLMBrainBridgeResponse {
  question: string;
  answer: string;
  confidence: number;
}

export class BrainBridgeLangChain implements LangChainStore {
  storage: LangChainStorage
  _store: HNSWLib | null = null;
  private _lowConfidenceAnswerHandler: (response: LLMBrainBridgeResponse) => void;
  constructor(storage: LangChainStorage = new BrainBridgeStorage(), lowConfidenceAnswerHandler: (response: LLMBrainBridgeResponse) => void) {
    this.storage = storage;
    this._lowConfidenceAnswerHandler = lowConfidenceAnswerHandler;
  }

  private getStore(trainingSetId: string): Promise<HNSWLib> {
    return new Promise((resolve, reject) => {
      if (this._store) {
        return this._store;
      }
      this.storage.getIndex(trainingSetId).then((index) => {
        this._store = index;
        resolve(index);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
   * 
   * @param userPrompt The text provided by the end-user
   * @param basePrompt The correctly formatted base prompt. Must contain: {history}, {context}, {prompt}
   * @param history The history of the conversation
   * @param store the HNSWLib instance (the index)
   * @returns 
   */
  async getLangChainResponse(indexId: string, userPrompt: string, basePrompt: string, history: string[], mode: "one-shot" | "critique" | "refine" = "one-shot") {
    const promptTemplate = new PromptTemplate({
      template: basePrompt,
      inputVariables: ["history", "context", "prompt"]
    });

    const llmChain = new LLMChain({
      llm: model,
      prompt: promptTemplate,
    });

    const store = await this.getStore(indexId)

    const data = await store.similaritySearch(userPrompt, 2);
    const context: string[] = [];

    data.filter(d => d.pageContent.trim().length > 0).forEach((item) => {
      context.push(`Context:\n${item.pageContent.trim()}`)
    });


    let rawResponse = await this.makeLangChainCall(llmChain, userPrompt, context, history);
    console.log("RAW RESPONSE", userPrompt, rawResponse)
    let response = this.tryParseResponse(userPrompt, rawResponse);
    let usedMode = mode;
    // Failed to parse response, try again
    if (response.confidence === -1) {
      rawResponse = await this.makeLangChainCall(llmChain, userPrompt, context, history);
      response = this.tryParseResponse(userPrompt, rawResponse);
    }

    if (response.confidence === -1) {
      console.warn("FAILED TO PARSE RESPONSE", response);
      usedMode = "refine";
      // return "I'm sorry, I had some trouble figuring out how to respond.";
    }

    console.log(response.confidence)
    if (response.confidence <= 0.85) {
      console.warn("LOW CONFIDENCE ANSWER", response);
      if (this._lowConfidenceAnswerHandler) {
        this._lowConfidenceAnswerHandler(response);
      }
    }

    if (usedMode === "one-shot") {
      return response.answer;
    }


    const critiqued = await this.critique(response.answer, userPrompt, history);
    if (usedMode === "critique") {
      const responseTemplate = `
        ### Original Request
        >>>
        {REQUEST}
        <<<

        ### Original Response
        >>>
        {RESPONSE}
        <<<
        
        ### Critique
        >>>
        {CRITIQUE}
        <<<
      `;
      return responseTemplate.replace("{REQUEST}", userPrompt).replace("{RESPONSE}", response.answer).replace("{CRITIQUE}", critiqued.text);
    }
    const refined = await this.refine(critiqued.text, response.answer, userPrompt, history);
    return refined.text.replace("New Response:", "").trim();
  }

  private async makeLangChainCall(llmChain: LLMChain<string>, userPrompt: string, context: string[], history: string[]) {
    console.log("CALLING LLM CHAIN", userPrompt, context, history)
    try {
      return await llmChain.call({ prompt: userPrompt, context: context.join('\n\n'), history }) as LLMResponse;
    } catch (err: unknown) {
      console.error("THIS IS THE", JSON.stringify(err, null, 2))
      throw err;
    }
  }

  private tryParseResponse(userPrompt: string, rawResponse: LLMResponse) {
    // UGH
    // TODO: I cannot get, with a prompt, the system to _stop_ sending things outside the JSON payload.
    // So here, we're cleaning up the response to only include the JSON payload.
    // This is a hack, and I'm not proud of it.
    const parseable = /\{[\S\s]*\}/gm
    const matched = rawResponse.text.match(parseable);
    let response: LLMBrainBridgeResponse | null = null;
    if (matched) {
      const cleanPercentageRegex = /\"confidence\":?\s(\d*%)/gm;
      let base = matched[0];
      const rex = new RegExp(cleanPercentageRegex);
      const matches = rex.exec(base);
      if (matches && matches?.length > 1) {
        const percentage = matches[1] || "0%";
        const amount = parseInt(percentage.replace("%", "")) / 100;
        base = base.replace(cleanPercentageRegex, `"confidence": ${amount}`)
      }
      /// Hooray, JSON      
      response = this.tryParsePayload(userPrompt, base);
      if (response.confidence > 1) {
        response.confidence = response.confidence / 100;
      }
    } else {
      /// Ugh, no JSON
      const cleanInCase = rawResponse.text.replaceAll(parseable, "");
      response = this.tryParsePayload(userPrompt, cleanInCase);
    }
    console.log("FINAL RESPONSE", response)
    return response;
  }

  private tryParsePayload(question: string, rawString: string): LLMBrainBridgeResponse {
    try {
      return JSON.parse(rawString) as LLMBrainBridgeResponse;
    } catch (err) {
      console.log("UNABLE TO PARSE RESPONSE", err, rawString)
      return {
        question,
        answer: rawString,
        confidence: -1,
      }
    }
  }

  private async critique(firstResponse: string, userPrompt: string, history: string[]) {
    const promptTemplate = new PromptTemplate({
      template: `
        Your Previous Response:
        {RESPONSE}

        Their question was: 
        {QUESTION}

        The history is: 
        {HISTORY}

        ---
        Above is your previous response. Critique your response to their question. Think step by step, why you said what you said, and how you could have said it better. Remember to think step-by-step.
      `, inputVariables: ["RESPONSE", "QUESTION", "HISTORY"]
    });

    const llmChain = new LLMChain({ llm: model, prompt: promptTemplate });

    const result = await llmChain.call({ RESPONSE: firstResponse, QUESTION: userPrompt, HISTORY: history }) as LLMResponse;
    console.log("critique", result.text);

    return result;
  }

  private async refine(critique: string, firstResponse: string, userPrompt: string, history: string[]) {
    const promptTemplate = new PromptTemplate({
      template: `
        Your Previous Response: {RESPONSE}
      
        Your Critique: {CRITIQUE}

        Their question is: {QUESTION}

        The history is: {HISTORY}
        ---
        Above is your previous response and your critique of it. Use your critique to refine your response to their question. 
      `, inputVariables: ["RESPONSE", "QUESTION", "CRITIQUE", "HISTORY"]
    });

    const llmChain = new LLMChain({ llm: model, prompt: promptTemplate });

    const result = await llmChain.call({ RESPONSE: firstResponse, QUESTION: userPrompt, CRITIQUE: critique, HISTORY: history }) as LLMResponse;
    console.log("refine", result.text);
    return result;
  }

}