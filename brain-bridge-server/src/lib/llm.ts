import { LLMChain, PromptTemplate } from "langchain";
import { OpenAIChat } from "langchain/llms/openai";
import { getTokensForStringWithRetry } from "./get-tokens-for-string.ts";
import getTotalLengthOfStrings from "./get-total-length-strings.ts";
import { CRITIQUE_PROMPT, REFINE_PROMPT } from "./prompt-templates.ts";
import { ChatResponseMode } from "~/api-v1/sockets/types.ts";
import { SimilaritySearchResult, SimilaritySearcher } from "./SimilaritySearchResult.ts";

export interface LangChainStore {
  getLangChainResponse: (indexId: string, userPrompt: string, basePrompt: string, history: string[], mode: "one-shot" | "critique" | "refine") => Promise<string>;
}


export type WeviateSimilaritySearcherResponse = {
  data: {
    Get: {
      [id: string]: SimilaritySearchResult[];
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
  critique?: string;
  refined?: string;
}

interface BrainBridgeLangChainHandlers {
  onTokensUsed: (tokens: number) => void;
  onLowConfidenceAnswer: (response: LLMBrainBridgeResponse) => void;
  onTokenReceived: (token: string, responsePhase: ChatResponseMode) => void;
}

export interface BrainBridgeAdditionalOptions {
  numberOfNearestNeighbors?: number;
}

const DEFAULT_ADDITIONAL_OPTIONS: BrainBridgeAdditionalOptions = {
  numberOfNearestNeighbors: 2,
}

interface BrainBridgeLangChainOptions {
  similaritySearcher: SimilaritySearcher;
  handlers: BrainBridgeLangChainHandlers,
  options?: BrainBridgeAdditionalOptions,
  openAIApiKey: string;
  models?: {
    "one-shot": string;
    "critique": string;
    "refine": string;
    "summarize": string;
  }
}

const OPENAI_DEFAULT_CONFIG = {
  temperature: 0,
  maxTokens: -1,
  modelName: 'gpt-3.5-turbo-0613',
}

export class BrainBridgeLangChain implements LangChainStore {
  private _lowConfidenceAnswerHandler: (response: LLMBrainBridgeResponse) => void;
  private _onTokensUsed: (tokens: number) => void = () => { };
  private _onTokenReceived: (token: string, responsePhase: ChatResponseMode) => void = () => { };
  private _additionalOptions: BrainBridgeAdditionalOptions = DEFAULT_ADDITIONAL_OPTIONS;
  private _similaritySearcher: SimilaritySearcher;
  private _openAIApiKey: string;
  private _models: {
    "one-shot": string
    "critique": string;
    "refine": string;
    "summarize": string;
  } = {
      "one-shot": 'gpt-3.5-turbo-0613',
      "critique": 'gpt-3.5-turbo-0613',
      "refine": 'gpt-3.5-turbo-0613',
      "summarize": 'gpt-3.5-turbo-0613',
    }
  constructor({ openAIApiKey, models, similaritySearcher, handlers: { onLowConfidenceAnswer, onTokensUsed, onTokenReceived }, options }: BrainBridgeLangChainOptions) {
    this._similaritySearcher = similaritySearcher;
    this._lowConfidenceAnswerHandler = onLowConfidenceAnswer;
    this._onTokensUsed = onTokensUsed;
    this._onTokenReceived = onTokenReceived;
    this._additionalOptions = { ...DEFAULT_ADDITIONAL_OPTIONS, ...(options ?? {}) };
    this._openAIApiKey = openAIApiKey;
    this._models = { ...this._models, ...(models ?? {}) };
  }

  async summarizeConversation(text: string) {
    const model = new OpenAIChat({
      ...OPENAI_DEFAULT_CONFIG,
      temperature: 0,
      openAIApiKey: this._openAIApiKey,
      modelName: this._models.summarize,
      maxTokens: -1,
    });

    const promptTemplate = new PromptTemplate({
      template: `This is a conversation between you and a human. Summarize this conversation keeping any important details, and use ONLY the information provided to you.

      The conversation is formatted as follows:
      [human name]: [human message]
      [you]: [your message]

      When you summarize, make sure to include who said what.

      Summarize: {text}`,
      inputVariables: ["text"]
    });
    const chain = new LLMChain({
      llm: model,
      prompt: promptTemplate,
    });
    const result = await this.langChainCall(chain, { text }, "one-shot");
    return result.text;
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

    const historyLength = getTotalLengthOfStrings(history);
    let historyString = history.join("\n");
    if (historyLength > 2000) {
      historyString = await this.summarizeConversation(historyString);
    }

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

    const model = new OpenAIChat({
      ...OPENAI_DEFAULT_CONFIG,
      temperature: 1,
      openAIApiKey: this._openAIApiKey,
      modelName: this._models["one-shot"],
      maxTokens: -1,
      streaming: true,
    });

    const llmChain = new LLMChain({
      llm: model,
      prompt: promptTemplate,
    });

    console.time("similarity-search")
    const set = `Training_Set_${indexId}`
    console.log("NEAREST", this._additionalOptions.numberOfNearestNeighbors ?? 2)
    const context = await this._similaritySearcher.similaritySearchToContext(userPrompt, this._additionalOptions.numberOfNearestNeighbors ?? 2);
    console.log(this._additionalOptions);
    console.log("[llm-request]", userPrompt, context, history, mode);
    console.time("llm-request")
    let rawResponse = await this.langChainCall(llmChain, { prompt: userPrompt, context, history: historyString }, "one-shot");
    console.timeEnd("llm-request")
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

    console.log("Last Answer Confidence", response.confidence)
    if (response.confidence <= 0.85) {
      if (this._lowConfidenceAnswerHandler) {
        this._lowConfidenceAnswerHandler(response);
      }
    }

    if (usedMode === "one-shot") {
      return response.answer;
    }


    const critiqued = await this.critique(response.answer, userPrompt, history);
    const critiquedResponse = this.tryParseResponse(userPrompt, critiqued);
    if (usedMode === "critique") {
      return critiquedResponse.answer;
    }
    const refined = await this.refine(critiqued.text, response.answer, userPrompt, history);
    const refinedResponse = this.tryParseResponse(userPrompt, refined);
    return refinedResponse.refined ?? "";
  }

  private async langChainCall(llmChain: LLMChain<string>, fields: Record<string, string | string[]>, responsePhase: ChatResponseMode) {

    const tokenCountsForAllFields = this.countTokensForLangChainCall(fields);
    const otr = this._onTokenReceived;
    const result = await llmChain.call(fields, [
      {
        handleLLMNewToken(token: string) {
          // console.log("[llm-token]", token, responsePhase, otr);
          otr(token, responsePhase);
        },
      },
    ]) as Promise<LLMResponse>;
    this._onTokensUsed(tokenCountsForAllFields)
    return result;
  }

  private getTokensForStringWithRetry = (str: string) => getTokensForStringWithRetry(str, "gpt-3.5-turbo-0301")

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
    const promptTemplate = CRITIQUE_PROMPT;
    const model = new OpenAIChat({
      temperature: 0,
      openAIApiKey: this._openAIApiKey,
      modelName: this._models.critique,
      maxTokens: -1,
      streaming: true,
    });

    const llmChain = new LLMChain({ llm: model, prompt: promptTemplate });

    const result = await this.langChainCall(llmChain, { response: firstResponse, question: userPrompt, history }, "critique") as LLMResponse;
    console.log("critique", result.text);

    return result;
  }

  private async refine(critique: string, firstResponse: string, userPrompt: string, history: string[]) {
    const promptTemplate = REFINE_PROMPT;
    const model = new OpenAIChat({
      temperature: 0,
      openAIApiKey: this._openAIApiKey,
      modelName: this._models.refine,
      maxTokens: -1,
      streaming: true,
    });

    const llmChain = new LLMChain({ llm: model, prompt: promptTemplate });

    const result = await this.langChainCall(llmChain, { response: firstResponse, question: userPrompt, critique: critique, history: history }, 'refine') as LLMResponse;

    console.log("refine", result.text);
    return result;
  }

}

