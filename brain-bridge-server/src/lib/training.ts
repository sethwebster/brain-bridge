import fs from 'fs'
import { Milvus } from "langchain/vectorstores/milvus";
import { CharacterTextSplitter, RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { CohereEmbeddings, OpenAIEmbeddings } from 'langchain/embeddings';
import path from 'path';
import jsdom from 'jsdom';
import { MissedQuestions, Prisma, TrainingSet, type TrainingSource } from '@prisma/client';
import R2 from './R2';
import { prisma } from './db';
import cleanUpHtml from './clean-up-html';
import { getTempFilePath } from './get-temp-file';
import PDFToText from './pdf-to-text';
import { textSplitterMine } from './textSplitterMine';
import client from './milvus';
import delay from './delay';

export interface ProgressPayload {
  stage: string; statusText: string, progress: number, additionalInfo?: string
}
export interface ProgressNotifier {
  (payload: ProgressPayload | ((stage: string, progress: ProgressPayload) => ProgressPayload)): void;
}

export const trainingSetWithRelations = Prisma.validator<Prisma.TrainingSetArgs>()({
  include: {
    trainingSources: true,
    questionsAndAnswers: true,
    conversations: true,
    missedQuestions: true,
  }
})

export type TrainingSetWithRelations = Prisma.TrainingSetGetPayload<typeof trainingSetWithRelations>


async function loadFile(file: string): Promise<string> {
  return new Promise((resolve) => {
    console.log(path.extname(file));
    const data = fs.readFileSync(file, 'utf-8')
    resolve(data);
  });
}

async function loadUrl(url: string, knownMimeType: string): Promise<string | Blob> {
  console.log("Loading url", url)
  const response = await fetch(url);
  if (response.status !== 200) throw new Error(`Failed to load url: ${url}`);
  let data: string | Blob;
  switch (knownMimeType) {
    case "text/markdown":
      data = await response.text();
      return data;
    case "text/html":
      data = await response.text();
      const doc = new jsdom.JSDOM(data).window.document;
      const htmlDoc = `<html><head><title>${doc.title}</title></head><body>${doc.body.innerHTML}</body></html>`
      /* Parse the HTML into markdown, and remove any bloks of script */
      const markdown = cleanUpHtml(htmlDoc);
      return markdown;
    case "application/json":
      data = await response.text();
      return data;
    case "application/pdf":
      data = await response.blob();
      return data;
    case "text/plain":
      data = await response.text();
      return data;
    default:
      data = await response.text();
      return data;
      throw new Error(`Unsupported content type: ${knownMimeType ?? ""}`);
  }
}

async function getSourceText(userId: string, source: TrainingSource, progressNotifier: ProgressNotifier): Promise<string> {
  progressNotifier({ stage: "source-load", statusText: `Loading ${source.name ?? source.content}`, progress: 0 });
  switch (source.type) {
    case "FILE":
      switch (source.mimeType) {
        case "application/pdf":
          progressNotifier({ stage: "source-load", statusText: `Converting ${source.name} to text`, progress: 0 });
          const pdfToText = new PDFToText(source.name);
          const text = await pdfToText.convert();
          progressNotifier({ stage: "source-load", statusText: `Converted ${source.name} to text`, progress: 1 });
          return text;
          break;
        default:
          if (source.content.length > 0) return source.content;
          return await loadFile(source.name);
      }
    case "URL":
      progressNotifier({ stage: "source-load", statusText: `Loading ${source.name}...`, progress: 0 });

      const key = `${userId}/${source.content}`;
      let url: string = "";
      if (source.name.startsWith("http")) {
        url = source.name;
      } else {
        url = await R2.getSignedUrlForRetrieval(key)
      }
      switch (source.mimeType) {
        // markdown
        case "text/markdown":
          const markdownContent = await loadUrl(url, source.mimeType);
          progressNotifier({ stage: "source-load", statusText: `Loaded ${source.name}...`, progress: 1 });
          return markdownContent as string;
        case "application/pdf":
          const content = await loadUrl(url, source.mimeType);
          const buffer = await (content as Blob).arrayBuffer();
          const tempFilePath = getTempFilePath(source.name);

          fs.writeFileSync(tempFilePath, Buffer.from(buffer));
          const pdfToText = new PDFToText(tempFilePath);
          const text = await pdfToText.convert();
          progressNotifier({ stage: "source-load", statusText: `Loaded ${source.name}...`, progress: 1 });
          return text;
        default:
          const data = await loadUrl(url, source.mimeType ?? "text/plain") as string;
          progressNotifier({ stage: "source-load", statusText: `Loaded ${source.name}...`, progress: 1 });
          return data;
      }
    default:
      throw new Error(`Unsupported source type`);
  }
}

function turnQuestionsIntoText(questions: MissedQuestions[]): string {
  const template = `

  ## Things a user might ask about and ideas of how to respond:

  {questions}

  `
  const mapped = questions.filter(q => !q.ignored).map((q) => `* ${q.question} - ${q.correctAnswer ?? "make something up"}`).join("\n");
  return template.replace("{questions}", mapped);
}
class CountKeeper {
  completed = 0;
}

export async function createTrainingIndex({ name, trainingSet, onProgress, options }: { name: string, trainingSet: TrainingSetWithRelations, onProgress?: ProgressNotifier, options?: { maxSegmentLength?: number, overlapBetweenSegments?: number } }): Promise<TrainingSet> {
  const usedOptions = { ...{ maxSegmentLength: 2000, overlapBetweenSegments: 200 }, ...(options ?? {}) }
  usedOptions.maxSegmentLength = parseInt(usedOptions.maxSegmentLength.toString());
  usedOptions.overlapBetweenSegments = parseInt(usedOptions.overlapBetweenSegments.toString());
  let progressNotifier = onProgress ?? (() => { });
  progressNotifier({ stage: "overall", statusText: "Training Started", progress: 0 });

  const { trainingSources } = trainingSet;

  /**
   * Load all the sources, just get the content as text
   */
  progressNotifier({ stage: "overall", statusText: "Loading sources...", progress: 0.1 });

  const countKeeper = new CountKeeper();
  const promises = trainingSources.map(async (source, index) => {
    const result = await getSourceText(trainingSet.userId, source, progressNotifier)
    countKeeper.completed++;
    progressNotifier({ stage: "sources-load", statusText: ``, progress: countKeeper.completed / trainingSources.length });
    return result;
  });
  // TODO: Figure out how to incorporate the missed questions into the training set
  const answeredQuestionText = `\n${turnQuestionsIntoText(trainingSet.missedQuestions)}\n`;

  /**
   * Wait for all the sources to load
   */
  progressNotifier({ stage: "sources-load", statusText: `Loading all sources.`, progress: 0 });
  const allContent = await Promise.all(promises);
  progressNotifier({ stage: "sources-load", statusText: `Loaded all sources.`, progress: 1 });

  /**
   * Split the content into chunks
   */
  progressNotifier({ stage: "overall", statusText: "Splitting documents...", progress: 0.2 });
  progressNotifier({ stage: "split-documents", statusText: `Splitting documents into chunks`, progress: 0 });
  let splitContent = await splitFileData([...allContent], progressNotifier, usedOptions);

  /**
   * Vectorize the content
   */
  progressNotifier({ stage: "overall", statusText: "Vectorizing documents...", progress: 0.3 });
  progressNotifier({ stage: "vectorize", statusText: `Vectorizing documents`, progress: 0 });
  try {
    await vectorize(splitContent, trainingSet.id, progressNotifier);
    progressNotifier({ stage: "vectorize", statusText: `Vectorized documents`, progress: 1 });
  } catch (e) {
    console.error(e);
    clearInterval(vectorProgressInterval);
    throw e;
  }
  console.log("index creation complete");
  progressNotifier({ stage: "overall", statusText: "Index creation complete", progress: 1 });
  return null;
}

let vectorProgressInterval: any = null;

async function vectorize(docs: string[], trainingSetId: string, progressNotifier: ProgressNotifier): Promise<void> {
  if (docs.length === 0) throw new Error("No documents to vectorize!");
  console.log("Vectorizing documents...")

  const sizeOfDocsData = docs.reduce((acc, doc) => acc + doc.length, 0);
  console.log(`Total size of docs data: ${sizeOfDocsData} bytes`)
  const ONE_MEGABYTE = 1000000;
  const MAX_BATCH_SIZE = ONE_MEGABYTE * 1;
  const batches = docs.reduce((acc, doc, i) => {
    if (!doc) return acc;
    const lastBatch = acc[acc.length - 1];
    if (!lastBatch) {
      acc.push([doc]);
      return acc;
    }
    const lastBatchSize = lastBatch.reduce((acc, doc) => acc + doc.length, 0);
    if (lastBatchSize + doc.length > MAX_BATCH_SIZE) {
      acc.push([doc]);
    } else {
      lastBatch.push(doc);
    }
    return acc;
  }, [] as string[][])
  console.log("Batches", batches.length);
  const batchCount = batches.length;

  try {
    await client.dropCollection({ collection_name: trainingSetId });
  } catch (e) {
    console.log("Error dropping collection", e)
  }
  // const embedder = new OpenAIEmbeddings();
  const embedder = new CohereEmbeddings({ apiKey: process.env.COHERE_API_KEY })
  let time = 0;
  const TIME_PER_BATCH = 9750;
  const totalTime = TIME_PER_BATCH * batches.length;
  const INTERVAL_LENGTH = 100;
  vectorProgressInterval = setInterval(() => {
    time = time + INTERVAL_LENGTH;
    progressNotifier({
      stage: "overall",
      statusText: "Vectorizing documents...",
      progress: 0.3 + ((time / totalTime))
    })

  }, INTERVAL_LENGTH);
  // takes 10 seconds/batch

  while (batches.length > 0) {
    progressNotifier({
      stage: "vectorize",
      statusText: `Vectorizing batch ${batchCount - batches.length + 1} of ${batchCount}`,
      progress: (batchCount - batches.length) / batchCount
    })
    console.log("Vectoring batch", batchCount - batches.length + 1, "of", batchCount)
    const batch = batches.shift();
    if (!batch) break;
    const filteredBatch = batch.filter(b => b && b.length > 0);
    const mappedMeta = filteredBatch.map((_, i) => ({ id: i }));
    try {
      await Milvus.fromTexts(filteredBatch, mappedMeta, embedder, {
        collectionName: trainingSetId,
      });
    } catch (e) {
      console.log("ERROR BATCH", filteredBatch.length, mappedMeta.length);
      throw e;
    }
    const stats = await client.getCollectionStatistics({     // Return the statistics information of the collection.
      collection_name: trainingSetId,
    });
    console.log("Collection statistics", stats);
  }
  clearInterval(vectorProgressInterval);
  const stats = await client.getCollectionStatistics({     // Return the statistics information of the collection.
    collection_name: trainingSetId,
  });
  client.flush({ collection_names: [trainingSetId] });
  console.log("Collection statistics", stats);
  console.log("Vectorization complete");
}

const textSplitter = new CharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 0,
  separator: "\n"
});

const text_splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 4000, chunkOverlap: 200, separators: [" ", ",", "\n"]
})
async function splitFileData(data: string[], progressNotifier: ProgressNotifier, options: { maxSegmentLength: number, overlapBetweenSegments: number }): Promise<string[]> {
  const countKeeper = new CountKeeper();
  console.log("Splitting text into chunks...", options)
  let docs: string[] = [];
  let index = 0;
  for (const d of data) {
    const docOutput = await textSplitterMine(d, options.maxSegmentLength, options.overlapBetweenSegments, [" ", ",", "\n"])
    docs = [...docs, ...docOutput];
    countKeeper.completed++;
    progressNotifier({ stage: "split-documents", statusText: `Splitting document ${countKeeper.completed} of ${data.length}`, progress: countKeeper.completed / data.length });
  }
  return docs;
}

