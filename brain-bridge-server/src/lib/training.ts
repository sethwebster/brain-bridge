import fs from 'fs'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Prisma, type TrainingSource } from '@prisma/client';
import path from 'path';
import fetch from 'node-fetch';
import { Document } from "langchain/document";
import { TextLoader } from "langchain/document_loaders/fs/text"
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import R2 from './R2.ts';
import { getTempFilePath } from './get-temp-file.ts';
// import client from './milvus.ts';
import { CountKeeper } from './count-keeper.ts';
import cleanUpHtml from './clean-up-html.ts';
import { TrainingStages } from '../api-v1/sockets/trainingHandler.ts';
import { CachedEmbeddings } from './CachedEmbeddings.ts';
import { getTokensForStringWithRetry } from './get-tokens-for-string.ts';
import weaviate, { WeaviateClient } from 'weaviate-ts-client';
import invariant from 'tiny-invariant';
import { initializeClient } from './WeviateSimilaritySearcher.ts';
import ServerData from './server-data.ts';

interface TrainingSetBuilderOptions {
  maxSegmentLength?: number;
  overlapBetweenSegments?: number;
}

interface TrainingSetBuilderParams {
  trainingSet: TrainingSetWithRelations;
  onProgress: ProgressNotifier,
  userId: string;
  options?: TrainingSetBuilderOptions;
  openAIApiKey: string;
}


type TrainingSourceInProgress = TrainingSource & {
  loadedContent: Document[]
}

export interface BuildResult {
  tokensUsed: number;
  cost: number;
}


export class TrainingSetBuilder {
  private trainingSet: TrainingSetWithRelations;
  private onProgress: ProgressNotifier;
  private userId: string;
  private openAIApiKey: string;
  private options: TrainingSetBuilderOptions;
  private client: WeaviateClient;

  constructor({ trainingSet, onProgress, userId, options, openAIApiKey }: TrainingSetBuilderParams) {

    this.trainingSet = trainingSet;
    this.onProgress = onProgress;
    this.userId = userId;
    this.options = {
      maxSegmentLength: parseInt(((options?.maxSegmentLength ?? 2000).toString())),
      overlapBetweenSegments: parseInt(((options?.overlapBetweenSegments ?? 200).toString())),
    }
    invariant(process.env.WEAVIATE_HOST, "WEAVIATE_URL must be set in .env");
    invariant(openAIApiKey, "OpenAI API key not found");
    this.client = initializeClient(openAIApiKey);
    this.openAIApiKey = openAIApiKey;
  }

  async build(onTokensUsed?: (buildResult: BuildResult) => void): Promise<BuildResult> {
    this.createSchema(this.trainingSet.id);
    const { trainingSources, questionsAndAnswers, conversations, missedQuestions } = this.trainingSet;
    const sources = await this.buildTrainingSources(trainingSources);
    // throw new Error("Not implemented");
    const buildResult: BuildResult = {
      tokensUsed: 0,
      cost: 0
    }

    const onTokensUsedLocal = (buildResultEvent: BuildResult) => {
      buildResult.tokensUsed = buildResultEvent.tokensUsed;
      buildResult.cost = buildResultEvent.cost;
      if (onTokensUsed) onTokensUsed(buildResult);
    }
    await this.vectorize(sources, onTokensUsedLocal);
    return buildResult;
  }

  async createSchema(id: string) {
    const set = `Training_Set_${this.trainingSet.id}`

    const schema = {
      'class': set,
      "vectorizer": "text2vec-openai",
      "moduleConfig": {
        "qna-openai": {
          "model": 'text-davinci-003', // For OpenAI
          "maxTokens": 16, // Applicable to both OpenAI and Azure OpenAI
          "temperature": 0.0,  // Applicable to both OpenAI and Azure OpenAI
          "topP": 1,  // Applicable to both OpenAI and Azure OpenAI
          "frequencyPenalty": 0.0,  // Applicable to both OpenAI and Azure OpenAI
          "presencePenalty": 0.0  // Applicable to both OpenAI and Azure OpenAI
        }
      },
      "properties": [
        {
          "dataType": [
            "text"
          ],
          "description": "Content that will be vectorized",
          "name": "text"
        },
        {
          "dataType": [
            "text"
          ],
          "description": "The original file name of the document",
          "name": "source"
        }

      ]
    }

    console.log("Creating schema...");
    try {
      const existingClass = await this.client.schema.classGetter().withClassName(set).do();
      if (existingClass) {
        const destroy = await this.client.schema.classDeleter().withClassName(set).do();
        console.log("Schema deleted.", destroy)
      }
    } catch (e) {
      console.log("Error deleting schema", e)
    }
    const res = await this.client.schema.classCreator().withClass(schema).do();
    console.log("Created schema.");
  }

  ///////////////
  // VECTORIZE //
  ///////////////////////////////////////////////////////////////////////////////////////////
  private async vectorize(trainingSources: TrainingSourceInProgress[], onTokensUsed: (buildResult: BuildResult) => void): Promise<BuildResult> {
    const list = await generateDocumentList(trainingSources);
    // if (trainingSources.length === 0) throw new Error("No documents to vectorize!");
    console.log("Vectorizing documents (weaviate)...");
    const buildResult: BuildResult = {
      tokensUsed: 0,
      cost: 0
    }


    const sizeOfDocsData = trainingSources.reduce((acc, doc) => {
      return acc + getDocumentsSize(doc.loadedContent);
    }, 0);


    console.log(`Total size of docs data: ${sizeOfDocsData} bytes`)
    const ONE_MEGABYTE = 1000000;
    const MAX_BATCH_SIZE = ONE_MEGABYTE * 1.5;
    const batches = this.splitIntoBatches(trainingSources, MAX_BATCH_SIZE);
    console.log("Batches", batches.length);
    const batchCount = batches.length;

    // try {
    //   await client.dropCollection({ collection_name: this.trainingSet.id });
    // } catch (e) {
    //   console.log("Error dropping collection", e)
    //   throw e;
    // }
    // const embedder = new OpenAIEmbeddings();
    const embedder = new CachedEmbeddings(this.openAIApiKey);

    let time = 0;
    // takes 10 seconds/batch
    let TIME_PER_BATCH = 7500;
    const ORIGINAL_BATCH_LENGTH = batches.length;
    const INTERVAL_LENGTH = 100;

    vectorProgressInterval = setInterval(() => {
      time = time + INTERVAL_LENGTH;
      const totalTime = TIME_PER_BATCH * ORIGINAL_BATCH_LENGTH;
      this.onProgress({
        stage: "overall",
        statusText: "Vectorizing documents...",
        valueType: "percentage", value: 0.3 + ((time / totalTime))
      })

    }, INTERVAL_LENGTH);

    try {
      while (batches.length > 0) {
        this.onProgress({
          stage: "vectorize",
          statusText: `Vectorizing batch ${batchCount - batches.length + 1} of ${batchCount}`,
          valueType: "percentage", value: (batchCount - batches.length) / batchCount
        })
        console.log("Vectoring batch", batchCount - batches.length + 1, "of", batchCount)
        const batch = batches.shift();
        if (!batch) break;
        const startTime = Date.now();
        const batcher = this.client.batch.objectsBatcher();
        try {
          const set = `Training_Set_${this.trainingSet.id}`
          const documents = batch.map((b, i) => b.loadedContent).flat();
          // console.log("Documents", documents)
          const tokensUsed = this.getTokensForStringWithRetry(documents.map(doc => doc.pageContent).join("\n"));
          buildResult.tokensUsed += tokensUsed;
          buildResult.cost = buildResult.cost * 0.0000004;
          onTokensUsed(buildResult);
          const embeddings = await embedder.embedDocuments(documents.map(doc => doc.pageContent));
          documents.forEach((doc, i) => {
            batcher.withObject({
              class: set,

              properties: {
                // id: generateUniqueClientId(),
                text: doc.pageContent,
                source: doc.metadata.source,
              },
              vector: embeddings[i]
            });
          });
          const res = await batcher.do();
          const endTime = Date.now();
          TIME_PER_BATCH = (endTime - startTime) / 1000;
          // console.log("Batch result", res);
        } catch (e) {
          console.log("ERROR BATCH", batch.length);
          throw e;
        }
        // const stats = await client.getCollectionStatistics({     // Return the statistics information of the collection.
        //   collection_name: this.trainingSet.id,
        // });
        // console.log("Batch Collection statistics: ", stats.data.row_count, "rows");
      }

      /**
       * This adds our list of documents used in training  to the Milvus database (ie. the actual index).
       */
      try {
        await embedder.embedDocuments(list.map(doc => doc.pageContent));
      } catch (e) {
        console.error("ERROR ADDING DOCUMENT LIST", e);
        throw e;
      }
      clearInterval(vectorProgressInterval);
      // const stats = await client.getCollectionStatistics({     // Return the statistics information of the collection.
      //   collection_name: this.trainingSet.id,
      // });
      // client.flush({ collection_names: [this.trainingSet.id] });
      // console.log("Final Collection statistics", stats.data.row_count, "rows");
      console.log("Vectorization complete");
      return buildResult;
    } catch (e) {
      throw e;
    } finally {
      clearInterval(vectorProgressInterval);
    }
  }

  private getTokensForStringWithRetry = (str: string) => getTokensForStringWithRetry(str, 'text-embedding-ada-002')


  private splitIntoBatches(trainingSources: TrainingSourceInProgress[], maxBatchSize: number) {
    console.log("Splitting into batches", trainingSources.length, maxBatchSize)
    return trainingSources.reduce((acc, doc, i) => {
      if (!doc) return acc;
      const lastBatch = acc[acc.length - 1];
      if (!lastBatch) {
        acc.push([doc]);
        return acc;
      }
      const lastBatchSize = lastBatch.reduce((acc, doc) => acc + getDocumentsSize(doc.loadedContent), 0);
      console.log("Last batch size", lastBatchSize, getDocumentsSize(doc.loadedContent), maxBatchSize)
      if (lastBatchSize + getDocumentsSize(doc.loadedContent) > maxBatchSize) {
        acc.push([doc]);
      } else {
        lastBatch.push(doc);
      }
      return acc;
    }, [] as TrainingSourceInProgress[][]);
  }

  /////////////
  // SOURCES //
  ///////////////////////////////////////////////////////////////////////////////////////////
  private async buildTrainingSources(trainingSources: TrainingSource[]): Promise<TrainingSourceInProgress[]> {
    this.onProgress({ stage: "sources-load", statusText: `Loading all sources.`, valueType: "percentage", value: 0 });
    const completeCounter = new CountKeeper();

    const promises = trainingSources.map(async (source) => {
      try {
        console.log("Loading source", source.name)
        const result = await this.loadTrainingSource(source);
        completeCounter.increment();
        this.onProgress({ stage: "source-load", statusText: `Loading ${source.name}`, valueType: "percentage", value: 1 })
        this.onProgress({ stage: "sources-load", statusText: `All Sources Loaded.`, valueType: "percentage", value: completeCounter.completed / trainingSources.length });
        return { error: false, result: result as TrainingSourceInProgress };
      } catch (e: unknown) {
        this.onProgress({ stage: "source-error", statusText: `Error loading ${source.name}`, error: true, errorData: source, valueType: "value", value: 1 })
        this.onProgress({ stage: "sources-load", statusText: `All Sources Loaded.`, valueType: "percentage", value: completeCounter.completed / trainingSources.length });
        return { error: true }
      }
    });
    const result = await Promise.all(promises);
    console.log("THE RESULT", result.length, "sources loaded")
    this.onProgress({ stage: "sources-load", statusText: `All Sources Loaded.`, valueType: "percentage", value: 1 });

    return result.filter(r => !r.error).map(r => r.result as TrainingSourceInProgress);
  }

  private async loadTrainingSource(source: TrainingSource): Promise<TrainingSourceInProgress> {
    this.onProgress({ stage: "source-load", statusText: `Loading ${source.name}`, valueType: "percentage", value: 0 });
    let documents: Document[];

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: this.options.maxSegmentLength,
      chunkOverlap: this.options.overlapBetweenSegments,
      separators: ["\n\n", "\n", ".", "?", "!"],
    });

    console.log("options", {
      chunkSize: this.options.maxSegmentLength,
      chunkOverlap: this.options.overlapBetweenSegments,
    })

    switch (source.type) {
      /**
       * @deprecated
       */
      case "FILE":
        throw new Error("FILE is no longer implemented");
      case "URL":
        const tempFilePath = await this.loadFile(source);
        switch (source.mimeType) {
          case "text/markdown":
            console.log("[load-training-source] Loading markdown file")
            documents = (await (new TextLoader(tempFilePath).loadAndSplit(
              splitter)
            ))
            console.log("[load-training-source] Loaded markdown file", documents.length)
            break;
          case "application/pdf":
            documents = (await (new PDFLoader(tempFilePath, {
              splitPages: true,
            }).loadAndSplit(
              splitter
            ))).map((doc, i) => {
              return {
                ...doc,
                metadata: {
                  ...doc.metadata,
                  page_number: i + 1,
                  pdf: undefined
                }
              }
            }).map((doc) => {
              delete doc.metadata.pdf;
              return doc;
            });

            const isSplitByPages = documents.some((d) => d.metadata.page_number !== 1)
            if (isSplitByPages) {
              const reducedToCombinedByPage = documents.reduce((acc, page) => {
                const existing = acc.find((a) => a.metadata.page_number === page.metadata.page_number);
                if (existing) {
                  existing.pageContent += "\n" + page.pageContent;
                  return acc;
                } else {
                  return [...acc, page];
                }
              }, [] as Document[]);
              documents = reducedToCombinedByPage;
            }
            break;
          case "application/msword":
          case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          // documents = await (new UnstructuredLoader(tempFilePath).loadAndSplit(
          //   splitter
          // ));
          // break;
          case "text/html":
            const source = await fs.readFileSync(tempFilePath, "utf-8");
            const cleaned = cleanUpHtml(source);
            const ext = path.extname(tempFilePath);
            const name = getTempFilePath(".md");
            await fs.writeFileSync(name, cleaned, "utf-8");
            documents = await (new TextLoader(name).loadAndSplit(
              splitter
            ));
            break;
          case "text/plain":
          case "application/json":
          default:
            console.log("[load-training-source] Default Loader - TextLoader")

            documents = await (new TextLoader(tempFilePath).loadAndSplit(
              splitter
            ))
            break;
        }

        let result = {
          ...source,
          loadedContent: documents.map((doc, i) => {
            return {
              ...doc,
              metadata: {
                ...doc.metadata,
                source: source.name,
                page_number: i + 1
              }
            }
          })
        }

        const aggregateKeys = documents.reduce((acc, doc) => {
          const keys = Object.keys(doc.metadata);
          return [...acc, ...keys];
        }, [] as string[]);
        const uniqueKeys = [...new Set(aggregateKeys)];
        this.onProgress({ stage: "source-load", statusText: `Loading ${source.name}`, valueType: "percentage", value: 1 });
        return result;
    }
  }


  /**
   * Loads content from a URL or from R2
   * @param source The source to load
   * @returns The path to the file
   */
  private async loadFile(source: TrainingSource) {
    // TODO: Rename source.name to something that isn't confusing
    // content sounds like it's the actual content of the file and is a
    // holdover from when we used to store the content in the database
    const key = `${this.trainingSet.userId}/${this.trainingSet.id}/${source.name}`;
    let url = "";

    // Some sources are literally a URL, so we don't need to do anything
    if (source.name.startsWith("http")) {
      url = source.name;
    }
    else if (source.name.startsWith("http")) {
      url = source.name;
    } else {
      // Otherwise, we need to get a signed URL from R2
      url = await R2.getSignedUrlForRetrieval(key)
      console.log("Signed URL", url, source.name, source.name)
    }
    const tempFilePath = getTempFilePath(source.name, { mkdir: true });

    // Download the file and write to tempFilePath
    const response = await fetch(url);
    console.log("Response", response.ok, response.status, response.statusText)
    if (response.ok) {
      // write to temp file
      const blob = await response.blob();
      const buffer = await blob.arrayBuffer();
      console.log("Writing to temp file at", tempFilePath, "with buffer length", buffer.byteLength, "bytes")
      fs.writeFileSync(tempFilePath, Buffer.from(buffer));
      return tempFilePath;
    } else {
      console.log("Failed to download file", url, response.status, response.statusText, source, key)
      throw new Error(`Failed to download file: ${url}`);
    }
  }
}

export default function arrayBufferToString(buffer: ArrayBuffer): string {
  return String.fromCharCode.apply(null, Array.from(new Uint32Array(buffer)));
}

export interface ProgressPayload {
  stage: TrainingStages; statusText: string, value: number, valueType: "value" | "percentage", additionalInfo?: string; error?: boolean; errorData?: object;
}
export interface ProgressNotifier {
  (payload: ProgressPayload): void;
}

export const trainingSetWithRelations = Prisma.validator<Prisma.TrainingSetArgs>()({
  include: {
    trainingSources: true,
    questionsAndAnswers: true,
    conversations: true,
    missedQuestions: true,
    usage: true,
  }
})

export type TrainingSetWithRelations = Prisma.TrainingSetGetPayload<typeof trainingSetWithRelations>

let vectorProgressInterval: any = null;

async function generateDocumentList(allContent: TrainingSourceInProgress[]): Promise<Document[]> {
  const documentsList = allContent.map(source => {
    return `* ${source.name} - ${source.mimeType} - ${source.createdAt}`;
  }).join("\n");
  const listDoc = `Documents used in training:\n${documentsList}\n\n`;
  const blob = new Blob([listDoc], { type: "text/plain" });
  const document = await (new TextLoader(blob).loadAndSplit(new RecursiveCharacterTextSplitter({
    chunkOverlap: 200,
    chunkSize: 1000
  })));
  return document.map((d, i) => {
    return {
      ...d,
      metadata: {
        ...d.metadata,
        page_number: i,
        source: "Training Document List",
        loc: { lines: { from: 0, to: 0 } }
      }
    }
  })
}

function getDocumentsSize(docs: Document<Record<string, any>>[]) {
  return docs.reduce((acc, doc) => acc + doc.pageContent.length, 0);
}
