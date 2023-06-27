import fs from 'fs'
import { Milvus } from "langchain/vectorstores/milvus";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import Cohere from "cohere-ai";
import { Prisma, type TrainingSource } from '@prisma/client';
import tiktoken from '@dqbd/tiktoken';
import path from 'path';
import fetch from 'node-fetch';
import { Document } from "langchain/document";
import { TextLoader } from "langchain/document_loaders/fs/text"
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import R2 from './R2.ts';
import { getTempFilePath } from './get-temp-file.ts';
import client from './milvus.ts';
import { CountKeeper } from './count-keeper.ts';
import cleanUpHtml from './clean-up-html.ts';
import { TrainingStages } from '../api-v1/sockets/trainingHandler.ts';
import { CachedEmbeddings } from './CachedEmbeddings.ts';

interface TrainingSetBuilderOptions {
  maxSegmentLength?: number;
  overlapBetweenSegments?: number;
}

interface TrainingSetBuilderParams {
  trainingSet: TrainingSetWithRelations;
  onProgress: ProgressNotifier;
  userId: string;
  options?: TrainingSetBuilderOptions;
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
  private options: TrainingSetBuilderOptions;

  constructor({ trainingSet, onProgress, userId, options }: TrainingSetBuilderParams) {
    this.trainingSet = trainingSet;
    this.onProgress = onProgress;
    this.userId = userId;
    this.options = {
      maxSegmentLength: parseInt(((options?.maxSegmentLength ?? 2000).toString())),
      overlapBetweenSegments: parseInt(((options?.overlapBetweenSegments ?? 200).toString())),
    }
  }

  async build(onTokensUsed?: (buildResult: BuildResult) => void): Promise<BuildResult> {
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
    try {
      await this.vectorize(sources, onTokensUsedLocal);
    } catch (e) {
      console.error(e);
    }
    return buildResult;
  }

  ///////////////
  // VECTORIZE //
  ///////////////////////////////////////////////////////////////////////////////////////////
  private async vectorize(trainingSources: TrainingSourceInProgress[], onTokensUsed: (buildResult: BuildResult) => void): Promise<BuildResult> {
    const list = generateDocumentList(trainingSources);
    Cohere.init(process.env.COHERE_API_KEY!)
    if (trainingSources.length === 0) throw new Error("No documents to vectorize!");
    console.log("Vectorizing documents...");
    const buildResult: BuildResult = {
      tokensUsed: 0,
      cost: 0
    }
    const getDocumentsSize = (docs: Document<Record<string, any>>[]) => {
      return docs.reduce((acc, doc) => acc + doc.pageContent.length, 0);
    }

    const sizeOfDocsData = trainingSources.reduce((acc, doc) => {
      return acc + getDocumentsSize(doc.loadedContent);
    }, 0);


    console.log(`Total size of docs data: ${sizeOfDocsData} bytes`)
    const ONE_MEGABYTE = 1000000;
    const MAX_BATCH_SIZE = ONE_MEGABYTE * 1.5;
    const batches = trainingSources.reduce((acc, doc, i) => {
      if (!doc) return acc;
      const lastBatch = acc[acc.length - 1];
      if (!lastBatch) {
        acc.push([doc]);
        return acc;
      }
      const lastBatchSize = lastBatch.reduce((acc, doc) => acc + getDocumentsSize(doc.loadedContent), 0);
      if (lastBatchSize + getDocumentsSize(doc.loadedContent) > MAX_BATCH_SIZE) {
        acc.push([doc]);
      } else {
        lastBatch.push(doc);
      }
      return acc;
    }, [] as TrainingSourceInProgress[][]);
    console.log("Batches", batches.length);
    const batchCount = batches.length;

    try {
      await client.dropCollection({ collection_name: this.trainingSet.id });
    } catch (e) {
      console.log("Error dropping collection", e)
      throw e;
    }
    // const embedder = new OpenAIEmbeddings();
    const embedder = new CachedEmbeddings() as any;

    let time = 0;
    // takes 10 seconds/batch
    const TIME_PER_BATCH = 7500;
    const totalTime = TIME_PER_BATCH * batches.length;
    const INTERVAL_LENGTH = 100;

    vectorProgressInterval = setInterval(() => {
      time = time + INTERVAL_LENGTH;
      this.onProgress({
        stage: "overall",
        statusText: "Vectorizing documents...",
        progress: 0.3 + ((time / totalTime))
      })

    }, INTERVAL_LENGTH);

    try {
      while (batches.length > 0) {
        this.onProgress({
          stage: "vectorize",
          statusText: `Vectorizing batch ${batchCount - batches.length + 1} of ${batchCount}`,
          progress: (batchCount - batches.length) / batchCount
        })
        console.log("Vectoring batch", batchCount - batches.length + 1, "of", batchCount)
        const batch = batches.shift();
        if (!batch) break;
        try {
          const documents = batch.map((b, i) => b.loadedContent).flat();
          // console.log("Documents", documents)
          const encoding = tiktoken.get_encoding("cl100k_base");
          const encoded = encoding.encode(documents.map(doc => doc.pageContent).join("\n"));
          buildResult.tokensUsed += encoded.length;
          buildResult.cost = buildResult.cost * 0.0000004;
          onTokensUsed(buildResult);
          const res = await Milvus.fromDocuments(documents, embedder, {
            collectionName: this.trainingSet.id,
          });
        } catch (e) {
          console.log("ERROR BATCH", batch.length);
          throw e;
        }
        const stats = await client.getCollectionStatistics({     // Return the statistics information of the collection.
          collection_name: this.trainingSet.id,
        });
        console.log("Collection statistics", stats);
      }

      /**
       * This adds our list of documents to the Milvus database.
       */
      await Milvus.fromDocuments([list], embedder, {
        collectionName: this.trainingSet.id,
      });

      clearInterval(vectorProgressInterval);
      const stats = await client.getCollectionStatistics({     // Return the statistics information of the collection.
        collection_name: this.trainingSet.id,
      });
      client.flush({ collection_names: [this.trainingSet.id] });
      console.log("Collection statistics", stats);
      console.log("Vectorization complete");
      return buildResult;
    } catch (e) {
      throw e;
    } finally {
      clearInterval(vectorProgressInterval);
    }
  }

  /////////////
  // SOURCES //
  ///////////////////////////////////////////////////////////////////////////////////////////
  private async buildTrainingSources(trainingSources: TrainingSource[]): Promise<TrainingSourceInProgress[]> {
    this.onProgress({ stage: "sources-load", statusText: `Loading all sources.`, progress: 0 });
    const completeCounter = new CountKeeper();

    const promises = trainingSources.map(async (source) => {
      const result = await this.loadTrainingSource(source);
      completeCounter.increment();
      this.onProgress({ stage: "source-load", statusText: `Loading ${source.name ?? source.content}`, progress: completeCounter.completed / trainingSources.length })

      return result;
    });
    const result = await Promise.all(promises);
    this.onProgress({ stage: "sources-load", statusText: `All Sources Loaded.`, progress: 1 });
    return result;
  }

  private async loadTrainingSource(source: TrainingSource): Promise<TrainingSourceInProgress> {
    this.onProgress({ stage: "source-load", statusText: `Loading ${source.name ?? source.content}`, progress: 0 });
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
        console.log("Unique keys", uniqueKeys);


        this.onProgress({ stage: "source-load", statusText: `Loading ${source.name ?? source.content}`, progress: 1 });
        return result;
    }
  }


  /**
   * Loads content from a URL or from R2
   * @param source The source to load
   * @returns The path to the file
   */
  private async loadFile(source: TrainingSource) {
    // TODO: Rename source.content to something that isn't confusing
    // content sounds like it's the actual content of the file and is a
    // holdover from when we used to store the content in the database
    const key = `${this.trainingSet.userId}/${source.content}`;
    let url = "";

    // Some sources are literally a URL, so we don't need to do anything
    if (source.name.startsWith("http")) {
      url = source.name;
    }
    else if (source.content.startsWith("http")) {
      url = source.content;
    } else {
      // Otherwise, we need to get a signed URL from R2
      url = await R2.getSignedUrlForRetrieval(key)
    }
    const tempFilePath = getTempFilePath(source.name, { mkdir: true });

    // Download the file and write to tempFilePath
    const response = await fetch(url);
    if (response.ok) {
      // write to temp file
      const blob = await response.blob();
      const buffer = await blob.arrayBuffer();
      console.log("Writing to temp file at", tempFilePath, "with buffer length", buffer.byteLength, "bytes")
      fs.writeFileSync(tempFilePath, Buffer.from(buffer));

      return tempFilePath;
    } else {
      throw new Error(`Failed to download file: ${url}`);
    }
  }
}

export interface ProgressPayload {
  stage: TrainingStages; statusText: string, progress: number, additionalInfo?: string
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


// async function loadFile(file: string): Promise<string> {
//   return new Promise((resolve) => {
//     console.log(path.extname(file));
//     const data = fs.readFileSync(file, 'utf-8')
//     resolve(data);
//   });
// }

// async function loadUrl(url: string, knownMimeType: string): Promise<string | Blob> {
//   console.log("Loading url", url)
//   const response = await fetch(url);
//   if (response.status !== 200) throw new Error(`Failed to load url: ${url}`);
//   let data: string | Blob;
//   switch (knownMimeType) {
//     case "text/markdown":
//       data = await response.text();
//       return data;
//     case "text/html":
//       data = await response.text();
//       const doc = new jsdom.JSDOM(data).window.document;
//       const htmlDoc = `<html><head><title>${doc.title}</title></head><body>${doc.body.innerHTML}</body></html>`
//       /* Parse the HTML into markdown, and remove any bloks of script */
//       const markdown = cleanUpHtml(htmlDoc);
//       return markdown;
//     case "application/json":
//       data = await response.text();
//       return data;
//     case "application/pdf":
//       data = await response.blob();
//       return data;
//     case "text/plain":
//       data = await response.text();
//       return data;
//     default:
//       data = await response.text();
//       return data;
//       throw new Error(`Unsupported content type: ${knownMimeType ?? ""}`);
//   }
// }

// async function getSourceText(userId: string, source: TrainingSource, notify: ProgressNotifier): Promise<T> {
//   notify({ stage: "source-load", statusText: `Loading ${source.name ?? source.content}`, progress: 0 });
//   switch (source.type) {
//     case "FILE":
//       switch (source.mimeType) {
//         case "application/pdf":
//           notify({ stage: "source-load", statusText: `Converting ${source.name} to text`, progress: 0 });
//           const pdfToText = new PDFToText(source.name);
//           const text = await pdfToText.convert();
//           notify({ stage: "source-load", statusText: `Converted ${source.name} to text`, progress: 1 });
//           return text;
//           break;
//         default:
//           if (source.content.length > 0) return source.content;
//           return await loadFile(source.name);
//       }
//     case "URL":
//       notify({ stage: "source-load", statusText: `Loading ${source.name}...`, progress: 0 });

//       const key = `${userId}/${source.content}`;
//       let url: string = "";
//       if (source.name.startsWith("http")) {
//         url = source.name;
//       } else {
//         url = await R2.getSignedUrlForRetrieval(key)
//       }
//       switch (source.mimeType) {
//         // markdown
//         case "text/markdown":
//           const markdownContent = await loadUrl(url, source.mimeType);
//           notify({ stage: "source-load", statusText: `Loaded ${source.name}...`, progress: 1 });
//           return markdownContent as string;
//         case "application/pdf":
//           const content = await loadUrl(url, source.mimeType);
//           const buffer = await (content as Blob).arrayBuffer();
//           const tempFilePath = getTempFilePath(source.name);

//           fs.writeFileSync(tempFilePath, Buffer.from(buffer));
//           const pdfToText = new PDFToText(tempFilePath);
//           const text = await pdfToText.convert();
//           notify({ stage: "source-load", statusText: `Loaded ${source.name}...`, progress: 1 });
//           return text;
//         default:
//           const data = await loadUrl(url, source.mimeType ?? "text/plain") as string;
//           notify({ stage: "source-load", statusText: `Loaded ${source.name}...`, progress: 1 });
//           return data;
//       }
//     default:
//       throw new Error(`Unsupported source type`);
//   }
// }

// function turnQuestionsIntoText(questions: MissedQuestions[]): string {
//   const template = `

//   ## Things a user might ask about and ideas of how to respond:

//   {questions}

//   `
//   const mapped = questions.filter(q => !q.ignored).map((q) => `* ${q.question} - ${q.correctAnswer ?? "make something up"}`).join("\n");
//   return template.replace("{questions}", mapped);
// }

// export async function createTrainingIndex({ name, trainingSet, onProgress, options }: { name: string, trainingSet: TrainingSetWithRelations, onProgress?: ProgressNotifier, options?: TrainingSetBuilderOptions }): Promise<TrainingSet> {
//   const usedOptions =
//     usedOptions.maxSegmentLength = parseInt(usedOptions.maxSegmentLength.toString());
//   usedOptions.overlapBetweenSegments = parseInt(usedOptions.overlapBetweenSegments.toString());
//   let notify = onProgress ?? (() => { });
//   notify({ stage: "overall", statusText: "Training Started", progress: 0 });

//   const { trainingSources } = trainingSet;

//   /**
//    * Load all the sources, just get the content as text
//    */
//   notify({ stage: "overall", statusText: "Loading sources...", progress: 0.1 });

//   const countKeeper = new CountKeeper();
//   const promises = trainingSources.map(async (source, index) => {
//     const result = await getSourceText(trainingSet.userId, source, notify)
//     countKeeper.completed++;
//     notify({ stage: "sources-load", statusText: ``, progress: countKeeper.completed / trainingSources.length });
//     return { source, result }
//   });
//   // TODO: Figure out how to incorporate the missed questions into the training set
//   const answeredQuestionText = `\n${turnQuestionsIntoText(trainingSet.missedQuestions)}\n`;

//   /**
//    * Wait for all the sources to load
//    */
//   notify({ stage: "sources-load", statusText: `Loading all sources.`, progress: 0 });
//   const allContent = await Promise.all(promises);
//   notify({ stage: "sources-load", statusText: `Loaded all sources.`, progress: 1 });

//   /**
//    * Split the content into chunks
//    */
//   notify({ stage: "overall", statusText: "Splitting documents...", progress: 0.2 });
//   notify({ stage: "split-documents", statusText: `Splitting documents into chunks`, progress: 0 });

//   const listDoc = {
//     source: "Document List",
//     content: generateDocumentList(allContent)
//   } as {
//     source: string;
//     content: string;
//   }

//   const mapped = allContent.map(({ source, result }) => ({
//     source: source.name,
//     content: result
//   }));

//   let splitContent = await splitFileData([...mapped, listDoc], notify, usedOptions);

//   /**
//    * Vectorize the content
//    */
//   notify({ stage: "overall", statusText: "Vectorizing documents...", progress: 0.3 });
//   notify({ stage: "vectorize", statusText: `Vectorizing documents`, progress: 0 });
//   try {
//     await vectorize(splitContent, trainingSet.id, notify);
//     notify({ stage: "vectorize", statusText: `Vectorized documents`, progress: 1 });
//   } catch (e) {
//     console.error(e);
//     clearInterval(vectorProgressInterval);
//     throw e;
//   }
//   console.log("index creation complete");
//   notify({ stage: "overall", statusText: "Index creation complete", progress: 1 });
//   return null;
// }

let vectorProgressInterval: any = null;

function generateDocumentList(allContent: TrainingSourceInProgress[]) {
  const documentsList = allContent.map(source => {
    return `* ${source.name} - ${source.mimeType} - ${source.createdAt}`;
  }).join("\n");
  const listDoc = `Documents used in training:\n${documentsList}\n\n`;
  return new Document({
    pageContent: listDoc,
    metadata: {
      source: "Training Document List",
      page_number: 1,
      loc: { lines: { from: 1, to: listDoc.length } }
    }
  })
}

// async function vectorize(docs: { source: string, content: string }[], trainingSetId: string, notify: ProgressNotifier): Promise<void> {
//   if (docs.length === 0) throw new Error("No documents to vectorize!");
//   console.log("Vectorizing documents...")

//   const sizeOfDocsData = docs.reduce((acc, doc) => acc + doc.content.length, 0);
//   console.log(`Total size of docs data: ${sizeOfDocsData} bytes`)
//   const ONE_MEGABYTE = 1000000;
//   const MAX_BATCH_SIZE = ONE_MEGABYTE * 1;
//   const batches = docs.reduce((acc, doc, i) => {
//     if (!doc) return acc;
//     const lastBatch = acc[acc.length - 1];
//     if (!lastBatch) {
//       acc.push([doc]);
//       return acc;
//     }
//     const lastBatchSize = lastBatch.reduce((acc, doc) => acc + doc.content.length, 0);
//     if (lastBatchSize + doc.content.length > MAX_BATCH_SIZE) {
//       acc.push([doc]);
//     } else {
//       lastBatch.push(doc);
//     }
//     return acc;
//   }, [] as { content: string, source: string }[][])
//   console.log("Batches", batches.length);
//   const batchCount = batches.length;

//   try {
//     await client.dropCollection({ collection_name: trainingSetId });
//   } catch (e) {
//     console.log("Error dropping collection", e)
//   }
//   // const embedder = new OpenAIEmbeddings();
//   const embedder = new CohereEmbeddings({ apiKey: process.env.COHERE_API_KEY })
//   let time = 0;
//   // takes 10 seconds/batch
//   const TIME_PER_BATCH = 9750;
//   const totalTime = TIME_PER_BATCH * batches.length;
//   const INTERVAL_LENGTH = 100;
//   vectorProgressInterval = setInterval(() => {
//     time = time + INTERVAL_LENGTH;
//     notify({
//       stage: "overall",
//       statusText: "Vectorizing documents...",
//       progress: 0.3 + ((time / totalTime))
//     })

//   }, INTERVAL_LENGTH);

//   while (batches.length > 0) {
//     notify({
//       stage: "vectorize",
//       statusText: `Vectorizing batch ${batchCount - batches.length + 1} of ${batchCount}`,
//       progress: (batchCount - batches.length) / batchCount
//     })
//     console.log("Vectoring batch", batchCount - batches.length + 1, "of", batchCount)
//     const batch = batches.shift();
//     if (!batch) break;
//     const filteredBatch = batch.filter(b => b && b.content.length > 0);
//     const mappedMeta = filteredBatch.map((_, i) => ({ id: i }));
//     try {
//       const batch = filteredBatch.map((b, i) => new Document(
//         {
//           pageContent: b.content,
//           metadata: {
//             source: b.source,
//             id: b.source.replace(/[^a-zA-Z0-9]/g, "_") + "_" + i
//           }
//         }
//       ));
//       await Milvus.fromDocuments(batch, embedder, {
//         collectionName: trainingSetId,
//       });
//     } catch (e) {
//       console.log("ERROR BATCH", filteredBatch.length, mappedMeta.length);
//       throw e;
//     }
//     const stats = await client.getCollectionStatistics({     // Return the statistics information of the collection.
//       collection_name: trainingSetId,
//     });
//     console.log("Collection statistics", stats);
//   }
//   clearInterval(vectorProgressInterval);
//   const stats = await client.getCollectionStatistics({     // Return the statistics information of the collection.
//     collection_name: trainingSetId,
//   });
//   client.flush({ collection_names: [trainingSetId] });
//   console.log("Collection statistics", stats);
//   console.log("Vectorization complete");
// }

// const textSplitter = new CharacterTextSplitter({
//   chunkSize: 1000,
//   chunkOverlap: 0,
//   separator: "\n"
// });

// const text_splitter = new RecursiveCharacterTextSplitter({
//   chunkSize: 4000, chunkOverlap: 200, separators: [" ", ",", "\n"]
// })
// async function splitFileData(data: { source: string, content: string }[], notify: ProgressNotifier, options: { maxSegmentLength: number, overlapBetweenSegments: number }): Promise<{ source: string, content: string }[]> {
//   const countKeeper = new CountKeeper();
//   console.log("Splitting text into chunks...", options)
//   let docs: { source: string, content: string }[] = [];
//   let index = 0;
//   for (const d of data) {
//     const docOutput = await textSplitterMine(d, options.maxSegmentLength, options.overlapBetweenSegments, [" ", ",", "\n"])
//     docs = [...docs, ...docOutput];
//     countKeeper.completed++;
//     notify({ stage: "split-documents", statusText: `Splitting document ${countKeeper.completed} of ${data.length}`, progress: countKeeper.completed / data.length });
//   }
//   return docs;
// }

