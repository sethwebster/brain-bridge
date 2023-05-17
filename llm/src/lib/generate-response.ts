import { OpenAIChat } from 'langchain/llms';
import { LLMChain, PromptTemplate } from 'langchain';
import { HNSWLib } from "langchain/vectorstores";
import { OpenAIEmbeddings } from 'langchain/embeddings';

export async function loadStore(basePrompt: string) {
  // Load the Vector Store from the `vectorStore` directory
  const store = await HNSWLib.load("vectorStore", new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY
  }));
  return store;
}

// OpenAI Configuration
const model = new OpenAIChat({
  temperature: 0.2,
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'gpt-3.5-turbo'
});

/** 
 * Generates a Response based on history and a prompt.
 * @param {string} history - 
 * @param {string} prompt - Th
 */
const generateResponse = async ({
  basePrompt,
  history,
  prompt,
  store
}: { basePrompt: string, history: string[], prompt: string, store: HNSWLib }) => {
  // Parse and initialize the Prompt
  const promptTemplate = new PromptTemplate({
    template: basePrompt,
    inputVariables: ["history", "context", "prompt"]
  });

  // Create the LLM Chain
  const llmChain = new LLMChain({
    llm: model,
    prompt: promptTemplate,
  });
  // Search for related context/documents in the vectorStore directory
  const data = await store.similaritySearch(prompt, 2);
  const context: string[] = [];
  data.forEach((item, i) => {
    context.push(`Context:\n${item.pageContent}`)
  });
  // Run the LLM Chain
  const result = await llmChain.call({ prompt, context: context.join('\n\n'), history });
  return result.text;
}

export default generateResponse;