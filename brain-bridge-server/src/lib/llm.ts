import { LLMChain, PromptTemplate } from "langchain";
import { OpenAIChat } from "langchain/llms/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Milvus } from "langchain/vectorstores/milvus";
import path from "path";
import { getTempFilePath } from "./get-temp-file.ts";
import { encoding_for_model } from "@dqbd/tiktoken";
import { SerpAPI, Tool } from "langchain/tools";

import { initializeAgentExecutorWithOptions } from "langchain/agents";


interface LangChainStorage<T> {
  getIndex<T>(id: string): Promise<T>;
}

export interface LangChainStore {
  getLangChainResponse: (indexId: string, userPrompt: string, basePrompt: string, history: string[]) => Promise<string>;
}

const model = new OpenAIChat({
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'gpt-3.5-turbo-0613',
  maxTokens: -1,
});

export class BrainBridgeStorage<Milvus> implements LangChainStorage<Milvus> {
  /**
   * @param id
   * @returns
   */
  async getIndex<Milvus>(id: string): Promise<Milvus> {
    // const embedder = new OpenAIEmbeddings()
    const embedder = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    const vectorStore = await Milvus.fromExistingCollection(
      embedder,
      {
        collectionName: id,
      }
    ) as Milvus;
    return vectorStore;
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
  tokens: number;
}

export interface LLMBrainBridgeResponse {
  question: string;
  answer: string;
  confidence: number;
}


export class BrainBridgeLangChain implements LangChainStore {
  storage: LangChainStorage<Milvus>
  _store: Milvus | null = null;
  private _lowConfidenceAnswerHandler: (response: LLMBrainBridgeResponse) => void;
  private _onTokensUsed: (tokens: number) => void = () => { };
  constructor(storage: LangChainStorage<Milvus> = new BrainBridgeStorage(), lowConfidenceAnswerHandler: (response: LLMBrainBridgeResponse) => void, onTokensUsed: (tokens: number) => void) {
    this.storage = storage;
    this._lowConfidenceAnswerHandler = lowConfidenceAnswerHandler;
    this._onTokensUsed = onTokensUsed;
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
    let attempts = 0;
    console.log("base-prompt", basePrompt)

    const encodedLength = this.getTokensForStringWithRetry(userPrompt);
    if (encodedLength > 4000) {
      throw new Error("Input too long");
    }
    if (this._onTokensUsed) {
      this._onTokensUsed(encodedLength);
    }
    const promptTemplate = new PromptTemplate({
      template: basePrompt.replace("{name}", ""),
      inputVariables: ["history", "context", "prompt"]
    });

    const llmChain = new LLMChain({
      llm: model,
      prompt: promptTemplate,
    });


    const store = await this.storage.getIndex<Milvus>(indexId);


    const data = await store.similaritySearch(userPrompt, 2);
    const context: string[] = [];

    data.filter(d => d.pageContent.trim().length > 0).forEach((item) => {
      context.push(`Context:\nDocument: ${item.metadata.source}\nContent:\n${item.pageContent.trim()}`)
    });


    console.log("[llm-request]", userPrompt, context, history, mode);
    let rawResponse = await this.langChainCall(llmChain, { prompt: userPrompt, context, history });
    let response = this.tryParseResponse(userPrompt, rawResponse);
    let usedMode = mode;

    // // Failed to parse response, try again
    // if (response.confidence === -1) {
    //   rawResponse = await this.makeLangChainCall(llmChain, userPrompt, context, history);
    //   response = this.tryParseResponse(userPrompt, rawResponse);
    // }

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

  private async langChainCall(llmChain: LLMChain<string>, fields: Record<string, string | string[]>) {

    const tokenCountsForAllFields = this.countTokensForLangChainCall(fields);

    const result = await llmChain.call(fields) as Promise<LLMResponse>;
    this._onTokensUsed(tokenCountsForAllFields)
    return result;
  }

  private getTokensForStringWithRetry(str: string) {
    let tokens = 0;
    let retry = 0;
    while (retry < 3) {
      try {
        tokens = encoding_for_model("gpt-3.5-turbo-0301").encode_ordinary(str).length;
        break;
      } catch (e) {
        retry++;
      }
    }
    if (str.length > 0 && tokens === 0) {
      console.log("TikTokEncoding Failed: Defaulting to local count");
      tokens = Math.floor(str.length * 1.1);
    }
    return tokens;
  }

  private countTokensForLangChainCall(fields: Record<string, string | string[]>) {
    const tokenCountsForAllFields = Object.values(fields).map((field) => {
      if (Array.isArray(field)) {
        return field.map((f) => this.getTokensForStringWithRetry(f as string)).reduce((a, b) => a + b, 0);
      }
      if (typeof field !== "string") {
        throw new Error("Unexpected field type");
      }
      return this.getTokensForStringWithRetry(field as string);
    }).reduce((a, b) => a + b, 0);
    return tokenCountsForAllFields;
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

    const result = await this.langChainCall(llmChain, { RESPONSE: firstResponse, QUESTION: userPrompt, HISTORY: history }) as LLMResponse;
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

    const result = await this.langChainCall(llmChain, { RESPONSE: firstResponse, QUESTION: userPrompt, CRITIQUE: critique, HISTORY: history }) as LLMResponse;

    console.log("refine", result.text);
    return result;
  }

}
