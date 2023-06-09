import fs from 'fs'
import { HNSWLib } from "langchain/vectorstores";
import { CharacterTextSplitter, RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings';
import path from 'path';
import jsdom from 'jsdom';
import { Prisma, type TrainingIndex, type TrainingSource } from '@prisma/client';
import cleanUpHtml from '../utils/clean-up-html';
import R2 from '../R2';
import { getTempFilePath } from '../utils/get-temp-file';
import { prisma } from '../db';

export const trainingSetWithRelations = Prisma.validator<Prisma.TrainingSetArgs>()({
  include: {
    trainingSources: true,
    questionsAndAnswers: true,
    conversations: true,    
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

async function loadUrl(url: string): Promise<string> {
  console.log("Loading url", url)
  const response = await fetch(url);
  if (response.status !== 200) throw new Error(`Failed to load url: ${url}`);
  console.log("file retrieved");
  const data = await response.text();
  console.log("file length", data.length);
  const headerRaw = response.headers.get('content-type') ?? "text/html";
  const contentType = headerRaw.split(';')[0];
  switch (contentType) {
    case "text/html":
      console.log("Processing html")
      const doc = new jsdom.JSDOM(data).window.document;

      const htmlDoc = `<html><head><title>${doc.title}</title></head><body>${doc.body.innerHTML}</body></html>`
      /* Parse the HTML into markdown, and remove any bloks of script */
      const markdown = cleanUpHtml(htmlDoc);
      console.log("html processed")
      return markdown;
    case "application/json":
    case "text/plain":
      return data;
    default:
      throw new Error(`Unsupported content type: ${contentType ?? ""}`);
  }
}

async function getSourceText(userId: string, source: TrainingSource): Promise<string> {
  switch (source.type) {
    case "FILE":
      if (source.content.length > 0) return source.content;
      return await loadFile(source.name);
    case "URL":
      const key = `${userId}/${source.content}`;
      const url = await R2.getSignedUrlForRetrieval(key)
      return await loadUrl(url);
    default:
      throw new Error(`Unsupported source type`);
  }
}

export async function createTrainingIndex({ name, trainingSet }: { name: string, trainingSet: TrainingSetWithRelations }): Promise<TrainingIndex> {
  const { trainingSources } = trainingSet;
  const promises = trainingSources.map((source) => getSourceText(trainingSet.userId, source));
  const allContent = await Promise.all(promises);
  const splitContent = await splitFileData(allContent);
  const tempFilePath = getTempFilePath(name)
  const store = await vectorize(splitContent);
  await store.save(tempFilePath)
  const indexPath = path.join(tempFilePath, `hnswlib.index`);
  const docStorePath = path.join(tempFilePath, `docstore.json`);
  const indexData = await fs.promises.readFile(indexPath);
  const docStoreData = await fs.promises.readFile(docStorePath);

  const existingIndex = await prisma.trainingIndex.findFirst({
    where: {
      trainingSetId: trainingSet.id
    }
  });
  if (existingIndex) {
    console.log('Deleting existing index')
    await prisma.trainingIndex.delete({
      where: {
        id: existingIndex.id
      }
    })
  }
  console.log("Creating training index")
  const trainingIndex = await prisma.trainingIndex.create({   
    data: {
      metaData: "",
      docStore: docStoreData,
      vectors: indexData,
      pending: false,
      id: "",
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

const text_splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 2000, chunkOverlap: 200, separators: [" ", ",", "\n"]
})

async function splitFileData(data: string[]): Promise<string[]> {

  console.log("Splitting text into chunks...")
  let docs: string[] = [];
  for (const d of data) {
    const docOutput = await textSplitter.splitText(d);
    docs = [...docs, ...docOutput];
  }
  return docs;
}

