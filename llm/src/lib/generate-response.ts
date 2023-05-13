import { OpenAIChat } from 'langchain/llms';
import { LLMChain, PromptTemplate } from 'langchain';
import { HNSWLib } from "langchain/vectorstores";
import { OpenAIEmbeddings } from 'langchain/embeddings';
import basePrompt from './basePrompt';

export async function loadStore() {
  // Load the Vector Store from the `vectorStore` directory
  const store = await HNSWLib.load("vectorStore", new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY
  }));
  return store;
}

console.clear();

// OpenAI Configuration
const model = new OpenAIChat({ 
  temperature: 0.2,
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'gpt-3.5-turbo'
});

// Parse and initialize the Prompt
const prompt = new PromptTemplate({
  template: basePrompt,
  inputVariables: ["history", "context", "prompt"]
});

// Create the LLM Chain
const llmChain = new LLMChain({
  llm: model,
  prompt
});

/** 
 * Generates a Response based on history and a prompt.
 * @param {string} history - 
 * @param {string} prompt - Th
 */
const generateResponse = async ({
  history,
  prompt,
  store
}: {history: string[], prompt: string, store: HNSWLib}) => {
  
  // Search for related context/documents in the vectorStore directory
  const data = await store.similaritySearch(prompt, 2);
  const context: string[] = [];
  data.forEach((item, i) => {
    context.push(`Context:\n${item.pageContent}`)
  });  
  // Run the LLM Chain
  const result = await llmChain.call({prompt, context: context.join('\n\n'), history});
  return result.text;
}

export default generateResponse;