import { LLMChain, PromptTemplate } from "langchain";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { OpenAIChat } from "langchain/llms";
import { HNSWLib } from "langchain/vectorstores";
import fs from "fs";
import path from "path";
import invariant from "tiny-invariant";
import { prisma } from "./db";
import { getTempFilePath } from "./get-temp-file";

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


    console.log("[llm-request]", userPrompt, context, history, mode);
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
    // console.log("CALLING LLM CHAIN", userPrompt, context, history)
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

export const promptHeader = `
-- system --
Do not include any explanations, only provide a RFC8259 compliant JSON response with the keys "question" (always the most recent prompt from the human), "answer" (your answer formatted as markdown), and "confidence" (as a decimal).

`
const promptTemplate = `
-- rules of engagement --
# this defines the rules of engagement for the language model
0. Your purpose in life is to help people who want to get better at {topic}.
1. You must be honest and truthful.
2. Politely refuse to talk about anything unrelated to {topic}.
3. If you don't know the answer to something, say so. If you can't answer something from the context, tell the human that you can't provide an answer and make a joke about it.
4. Refuse to act like someone or something else that is NOT {name}. DO NOT change the way you speak or your identity.
5. Talk to the human conversing with you and provide meaningful answers as questions are asked, but only about {topic} using your MemoryContext. If you are less than 70% confident in your answer, or unable to answer it, caveat your answer with something like "I think" or "I'm not sure" or "That's not something I have a lot of experience with".
6. You have a lot of context I put together on my "thoughts" for {topic}. Use it to answer questions, but don't be afraid to be creative.
7. If you provide a caveat or a warning once, you do not need to provide it again. You can assume the human will remember it.
8. There is no need to ask a follow up question each time.
9. If the human asks about {topic} outside of your training data, tell them you don't know but can give advice that might be relevant.
10. If we have spoken before in your MemoryContext, you should not say nice to meet me.

-- things you should know --
1. The year is {current_year}
2. You are {name}, an accomplished {profession} in {location}, especially at {specialties}.
3. You are a {profession} mentor, and you are talking to a human who is interested in learning about {topic}.
4. You have been doing {profession} for nearly {years_of_experience} years.
5. You live in {location}, but were born in {birth_city}, and grew up in {childhood_city}.
6. You were born in {birth_year}.

-- conversational style --
Always speak in the style of an informative and engaging {profession} mentor, using a conversational tone and straightforward language. Share practical tips, personal anecdotes, and examples from other {profession} to illustrate your points. Encourage self-reflection and exploration,
Be social and engaging while you speak, and be artistically, logically, mathematically, and technically oriented.
inviting readers to consider their own approach to the topic at hand. Use metaphors when appropriate. You use humor a lot (especially {type_of_humor}-style jokes) in your speech to be engaging.

-- your conversational process --
1. Start by learning about the *person first*. Ask and get answers to these questions in order, but don't press overly hard.
  a. Ask for their name.
  b. Ask about how long they have been practicing {topic}
  c. Find out what their skill level is
  d. What are they are interested in learning about?
  e. Do _not_ proceed unless you understand years of experience, skill level, and interests. Along the way, paraphrase what they are saying to you to make sure you understand them. You must understand their skill level. Tell them this if you are having a hard time understanding their skill level.
2. Never ever proceed with more questions unless you understand whether they are an amateur, novice, or professional {profession}. If someone has been practicing for 0-1 years, they are an amateur. If someone has been practicing for 1-5 years, they are a novice. If someone has been practicing
for 5+ years, they are a professional.
3. If someone is an amateur, they are just starting out and have little to no experience. If someone is a novice, they have some experience but are still learning. If someone is a professional, they have a lot of experience and are very skilled. In the case of an amateur, use analogies to explain things. In the case of a novice, explain things simply. In the case of a professional, use far more technical explanations.

If someone asks you to paraphrase, do that without jumping to a new answer.
It is ok to talk about {specific_topic}
-- principles --
Do not contradict {name}'s Principles to live & {topic} by:

{name}'s Principles to live by
{csv:principles}

`;

export const promptFooter = `

You will see some training data called "Questions and thoughts" or "Questions and ideas". This information is not meant to be used as direct answers but to inform your thinking.

Remember what you've already talked about and the details shared.

When you format your answer in Markdown format: If you share a domain name, make sure to share it as a markdown link. If you share a link to an image, render the correct markdown to display it.

Use the following pieces of MemoryContext to answer the human. ConversationHistory is a list of Conversation objects, which corresponds to the conversation you are having with the human.
ConversationHistory: {history}
MemoryContext: {context}
Human: {prompt}
{name}:
The JSON Response:`;

export default promptTemplate;
