import invariant from "tiny-invariant";
import { SimilaritySearchResult, SimilaritySearcher } from "./SimilaritySearchResult.ts";
import { WeviateSimilaritySearcherResponse } from "./llm.ts";
import weaviate, { WeaviateClient } from 'weaviate-ts-client';

invariant(process.env.WEAVIATE_HOST, "WEAVIATE_URL must be set in .env");

export function initializeClient(openAIApiKey: string) {
  invariant(process.env.WEAVIATE_HOST, "WEAVIATE_URL must be set in .env");
  const client = weaviate.client({
    scheme: 'http',
    host: process.env.WEAVIATE_HOST,
    headers: {
      'X-OpenAI-Api-Key': openAIApiKey
    },
  })
  return client;
}

export default class WeviateSimilaritySearcher implements SimilaritySearcher {
  private indexId: string;
  private client: WeaviateClient
  /**
   *
   * @param indexId The fully qualified (ie `Training_Set_[id]`) id for the class within Weviate to search.
   */
  constructor(indexId: string, client: WeaviateClient) {
    this.indexId = indexId;
    this.client = client;
  }

  async similaritySearch(query: string, maxResults: number): Promise<SimilaritySearchResult[]> {
    const res = await this.client.graphql.get().withClassName(this.indexId).withAsk({
      question: query,
    }).withLimit(maxResults).withFields("text source").do() as WeviateSimilaritySearcherResponse;
    return res.data.Get[this.indexId];
  }

  async similaritySearchToContext(query: string, maxResults: number): Promise<string[]> {
    const res = await this.client.graphql.get().withClassName(this.indexId).withAsk({
      question: query,
    }).withLimit(maxResults).withFields("text source").do() as WeviateSimilaritySearcherResponse;
    const context = res.data.Get[this.indexId].map((item: any) => {
      return `Context:\nDocument: ${item.source}\nContent:\n${item.text.trim()}`;
    });
    return context;
  }
}
