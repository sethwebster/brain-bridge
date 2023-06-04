import fs from 'fs'
import { HNSWLib } from "langchain/vectorstores";
import { CharacterTextSplitter, RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings';
import path from 'path';
import jsdom from 'jsdom';
import { MissedQuestions, Prisma, type TrainingIndex, type TrainingSource } from '@prisma/client';
import R2 from './R2';
import { prisma } from './db';
import cleanUpHtml from './clean-up-html';
import { getTempFilePath } from './get-temp-file';
import PDFToText from './pdf-to-text';

export interface ProgressNotifier {
  (payload: { currentStage: string; statusText: string, progress: number, additionalInfo?: string }): void;
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
  console.log("file retrieved");
  let data: string | Blob;
  switch (knownMimeType) {
    case "text/markdown":
      data = await response.text();
      return data;
    case "text/html":
      data = await response.text();
      console.log("file length", data.length);

      console.log("Processing html")
      const doc = new jsdom.JSDOM(data).window.document;

      const htmlDoc = `<html><head><title>${doc.title}</title></head><body>${doc.body.innerHTML}</body></html>`
      /* Parse the HTML into markdown, and remove any bloks of script */
      const markdown = cleanUpHtml(htmlDoc);
      console.log("html processed")
      return markdown;
    case "application/json":
      data = await response.text();
      console.log("file length", data.length);

      return data;
    case "application/pdf":
      data = await response.blob();
      console.log("PDF file length", data.size)
      return data;
    case "text/plain":
      data = await response.text();
      console.log("file length", data.length);

      return data;
    default:
      data = await response.text();
      return data;
      throw new Error(`Unsupported content type: ${knownMimeType ?? ""}`);
  }
}

async function getSourceText(userId: string, source: TrainingSource, progressNotifier: ProgressNotifier): Promise<string> {
  progressNotifier({ currentStage: "source-load", statusText: `Loading ${source.name ?? source.content}`, progress: 0 });
  switch (source.type) {
    case "FILE":
      switch (source.mimeType) {
        case "application/pdf":
          progressNotifier({ currentStage: "source-load", statusText: `Converting ${source.name} to text`, progress: 0 });
          const pdfToText = new PDFToText(source.name);
          const text = await pdfToText.convert();
          progressNotifier({ currentStage: "source-load", statusText: `Converted ${source.name} to text`, progress: 1 });
          return text;
          break;
        default:
          if (source.content.length > 0) return source.content;
          return await loadFile(source.name);
      }
    case "URL":
      progressNotifier({ currentStage: "source-load", statusText: `Loading ${source.name}...`, progress: 0 });

      const key = `${userId}/${source.content}`;
      let url: string = "";
      if (source.name.startsWith("http")) {
        url = source.name;
      } else {
        url = await R2.getSignedUrlForRetrieval(key)
      }
      console.log("Will retrieve for", source.content, url)
      console.log("STORED SOURCE MIME", source.mimeType)
      switch (source.mimeType) {
        // markdown
        case "text/markdown":
          const markdownContent = await loadUrl(url, source.mimeType);
          progressNotifier({ currentStage: "source-load", statusText: `Loaded ${source.name}...`, progress: 1 });
          return markdownContent as string;
        case "application/pdf":
          const content = await loadUrl(url, source.mimeType);
          const buffer = await (content as Blob).arrayBuffer();
          const tempFilePath = getTempFilePath(source.name);
          console.log("Saved to", tempFilePath)

          fs.writeFileSync(tempFilePath, Buffer.from(buffer));
          const pdfToText = new PDFToText(tempFilePath);
          const text = await pdfToText.convert();
          console.log("Successfully converted PDF to text. Length:", text.length)
          progressNotifier({ currentStage: "source-load", statusText: `Loaded ${source.name}...`, progress: 1 });
          return text;
        default:
          const data = await loadUrl(url, source.mimeType ?? "text/plain") as string;
          progressNotifier({ currentStage: "source-load", statusText: `Loaded ${source.name}...`, progress: 1 });
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

export async function createTrainingIndex({ name, trainingSet, onProgress, options }: { name: string, trainingSet: TrainingSetWithRelations, onProgress?: ProgressNotifier, options?: { maxSegmentLength?: number, overlapBetweenSegments?: number } }): Promise<TrainingIndex> {
  const usedOptions = { ...{ maxSegmentLength: 2000, overlapBetweenSegments: 200 }, ...(options ?? {}) }
  usedOptions.maxSegmentLength = parseInt(usedOptions.maxSegmentLength.toString());
  usedOptions.overlapBetweenSegments = parseInt(usedOptions.overlapBetweenSegments.toString());
  let progressNotifier = onProgress ?? (() => { });
  progressNotifier({ currentStage: "overall", statusText: "Training Started", progress: 0 });
  const { trainingSources } = trainingSet;
  const promises = trainingSources.map((source, index) => {
    console.log('progress', index / trainingSources.length)
    progressNotifier({ currentStage: "sources-load", statusText: `Loading ${source.name}...`, progress: index / trainingSources.length });
    const result = getSourceText(trainingSet.userId, source, progressNotifier)
    return result;
  });
  progressNotifier({ currentStage: "overall", statusText: "Loading sources...", progress: 0.1 });
  const answeredQuestionText = `\n${turnQuestionsIntoText(trainingSet.missedQuestions)}\n`;
  progressNotifier({ currentStage: "sources-load", statusText: `Loading all sources.`, progress: 0 });
  const allContent = await Promise.all(promises);
  progressNotifier({ currentStage: "sources-load", statusText: `Loaded all sources.`, progress: 1 });

  progressNotifier({ currentStage: "overall", statusText: "Splitting documents...", progress: 0.2 });
  progressNotifier({ currentStage: "split-documents", statusText: `Splitting documents into chunks`, progress: 0 });
  const splitContent = await splitFileData([...allContent], progressNotifier, usedOptions);
  const tempFilePath = getTempFilePath(name)
  progressNotifier({ currentStage: "overall", statusText: "Vectorizing documents...", progress: 0.3 });
  progressNotifier({ currentStage: "vectorize", statusText: `Vectorizing documents`, progress: 0 });
  const store = await vectorize(splitContent);
  progressNotifier({ currentStage: "vectorize", statusText: `Vectorized documents`, progress: 1 });
  progressNotifier({ currentStage: "overall", statusText: "Creating index...", progress: 0.6 });
  await store.save(tempFilePath)
  const indexPath = path.join(tempFilePath, `hnswlib.index`);
  const docStorePath = path.join(tempFilePath, `docstore.json`);
  const indexData = await fs.promises.readFile(indexPath);
  const docStoreData = await fs.promises.readFile(docStorePath);
  progressNotifier({ currentStage: "overall", statusText: "Deleting existing index", progress: .85 });
  const existingIndex = await prisma.trainingIndex.findFirst({
    where: {
      trainingSetId: trainingSet.id
    }
  });
  if (existingIndex) {
    console.log('Deleting existing index')
    await prisma.trainingIndex.delete({
      where: {
        id: existingIndex.id,
      }
    })
  }
  progressNotifier({ currentStage: "overall", statusText: "Creating new index", progress: 0.95 });
  console.log("Creating training index")
  const trainingIndex = await prisma.trainingIndex.create({
    data: {
      metaData: "",
      docStore: docStoreData,
      vectors: indexData,
      pending: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      trainingSet: {
        connect: {
          id: trainingSet.id
        }
      }
    }
  });
  console.log("index creation complete");
  progressNotifier({ currentStage: "overall", statusText: "Index creation complete", progress: 1 });
  return trainingIndex;
}

async function vectorize(docs: string[]): Promise<HNSWLib> {
  if (docs.length === 0) throw new Error("No documents to vectorize!");
  console.log("Vectorizing documents...")
  const store = await HNSWLib.fromTexts(
    docs,
    docs.map((_, i) => ({ id: i })),
    new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      // modelName: 'gpt-3.5-turbo'
    })
  )
  console.log("Documents vectorized")
  return store;
}

const textSplitter = new CharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 0,
  separator: "\n"
});

function textSplitterMine(str: string, chunkSize: number, chunkOverlap: number, separator: string[] = [" ", ",", "\n"]) {
  console.log("Splitting a string of ", str.length, "Characters");
  console.log("Chunk size", chunkSize);
  console.log("Chunk overlap", chunkOverlap);

  let chunks: string[] = [str];
  const maxLen = (chunks: string[]) => {
    const lengths = chunks.map((c) => c.length);
    const maxLen = Math.max(...lengths);
    console.log("Max length", maxLen);
    return maxLen;
  }
  let lastChunkMaxLen = maxLen(chunks);
  let timesSeenSameMaxLen = 0;
  while (maxLen(chunks) > chunkSize) {
    if (lastChunkMaxLen === maxLen(chunks)) {
      timesSeenSameMaxLen++;
    }
    if (timesSeenSameMaxLen > 2) {
      console.log("Max length stuck. Breaking.")
      lastChunkMaxLen = 0;
      break;
    }
    const newStart: string[] = [];
    // Split into chunks of chunkSize
    for (const s of chunks) {
      if (s.length > chunkSize) {
        const approxMiddle = Math.floor(s.length / 2);
        let index = approxMiddle;
        while (!separator.includes(s[index]) && index < s.length) {
          index++;
        }
        const firstHalf = s.slice(0, index + chunkOverlap);
        const secondHalf = s.slice(index - chunkOverlap);
        newStart.push(firstHalf);
        newStart.push(secondHalf);
      } else {
        newStart.push(s);
      }
    }
    lastChunkMaxLen = maxLen(chunks);
    chunks = newStart;
  }
  const filtered = chunks.filter((c) => c && c.length > 0);
  console.log("Split into", filtered.length, "chunks", Array.isArray(filtered))
  return filtered;
}

const text_splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 4000, chunkOverlap: 200, separators: [" ", ",", "\n"]
})
async function splitFileData(data: string[], progressNotifier: ProgressNotifier, options: { maxSegmentLength: number, overlapBetweenSegments: number }): Promise<string[]> {

  console.log("Splitting text into chunks...")
  let docs: string[] = [];
  let index = 0;
  for (const d of data) {
    progressNotifier({ currentStage: "split-documents", statusText: `Splitting document ${index + 1} of ${data.length}`, progress: index / data.length });
    const docOutput = await textSplitterMine(d, options.maxSegmentLength, options.overlapBetweenSegments, [" ", ",", "\n"])
    docs = [...docs, ...docOutput];
    index++;
  }
  return docs;
}

