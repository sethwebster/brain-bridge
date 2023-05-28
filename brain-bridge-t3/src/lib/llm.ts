import { LLMChain, PromptTemplate } from "langchain";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { OpenAIChat } from "langchain/llms";
import { HNSWLib } from "langchain/vectorstores";
import fs from "fs";
import path from "path";
import invariant from "tiny-invariant";
import { prisma } from "~/server/db";
import { getTempFilePath } from "~/utils/files";

interface LLMResponse {
  text: string;
}

interface LangChainStorage {
  getIndex(id: string): Promise<HNSWLib>;
}

export interface LangChainStore {
  getLangChainResponse: (indexId: string, userPrompt: string, basePrompt: string, history: string[]) => Promise<string>;
}

const model = new OpenAIChat({
  temperature: 0.2,
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

export class BrainBridgeLangChain implements LangChainStore {
  storage: LangChainStorage
  _store: HNSWLib | null = null;
  constructor(storage: LangChainStorage = new BrainBridgeStorage()) {
    this.storage = storage;
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

    const originalResponse = await llmChain.call({ prompt: userPrompt, context: context.join('\n\n'), history }) as LLMResponse;
    if (mode === "one-shot") {
      return originalResponse.text;
    }
    const critiqued = await this.critique(originalResponse.text, userPrompt, history);
    if (mode === "critique") {
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
      return responseTemplate.replace("{REQUEST}",userPrompt).replace("{RESPONSE}",originalResponse.text).replace("{CRITIQUE}",critiqued.text);
    }
    const refined = await this.refine(critiqued.text, originalResponse.text, userPrompt, history);
    return refined.text.replace("New Response:", "").trim();
  }

  private async critique(firstResponse: string, userPrompt:string, history: string[]) {
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
      `, inputVariables: ["RESPONSE", "QUESTION", "HISTORY"]});

    const llmChain = new LLMChain({ llm: model, prompt: promptTemplate });

    const result = await llmChain.call({ RESPONSE: firstResponse, QUESTION: userPrompt, HISTORY: history }) as LLMResponse;
    console.log("critique", result.text);

    return result;
  }

  private async refine(critique: string, firstResponse: string, userPrompt:string, history: string[]) {
    const promptTemplate = new PromptTemplate({
      template: `
        Your Previous Response: {RESPONSE}
      
        Your Critique: {CRITIQUE}

        Their question is: {QUESTION}

        The history is: {HISTORY}
        ---
        Above is your previous response and your critique of it. Use your critique to refine your response to their question. 
      `, inputVariables: ["RESPONSE", "QUESTION", "CRITIQUE", "HISTORY"]});

    const llmChain = new LLMChain({ llm: model, prompt: promptTemplate });

    const result = await llmChain.call({ RESPONSE: firstResponse, QUESTION: userPrompt, CRITIQUE: critique, HISTORY: history }) as LLMResponse;
    console.log("refine", result.text);
    return result;
  }

}