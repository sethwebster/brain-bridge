export interface SimilaritySearchResult {
  text: string;
  source: string;
}
export interface SimilaritySearcher {
  similaritySearch: (query: string, maxResults: number) => Promise<SimilaritySearchResult[]>;
  similaritySearchToContext: (query: string, maxResults: number) => Promise<string[]>;
}
