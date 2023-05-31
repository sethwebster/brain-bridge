import fs from 'fs'
import { HNSWLib } from "langchain/vectorstores";
import { CharacterTextSplitter, RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings';
import path from 'path';
import jsdom from 'jsdom';
import { type TrainingIndex, type TrainingSource } from '@prisma/client';
import { type TrainingSetWithRelations } from '~/server/interfaces/types';
import ServerData from '~/server/server-data';
import { cleanUpHtml } from '~/utils/html-to-markdown';
import { getTempFilePath } from '~/utils/files';
import { getServerSession } from '~/server/auth';
import R2 from '../R2';
import invariant from 'tiny-invariant';

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

async function getSourceText(source: TrainingSource): Promise<string> {
  switch (source.type) {
    case "FILE":
      if (source.content.length > 0) return source.content;
      return await loadFile(source.name);
    case "URL":
      const session = await getServerSession();
      invariant(session?.user.id, "User must be logged in to load url");
      const key = `${session?.user.id}/${source.content}`;
      const url = await R2.getSignedUrlForRetrieval(key)
      return await loadUrl(url);
    default:
      throw new Error(`Unsupported source type`);
  }
}

export async function createTrainingIndex({ name, trainingSet }: { name: string, trainingSet: TrainingSetWithRelations }): Promise<TrainingIndex> {
  const { trainingSources } = trainingSet;
  const promises = trainingSources.map((source) => getSourceText(source));
  const allContent = await Promise.all(promises);
  const splitContent = await splitFileData(allContent);
  const tempFilePath = getTempFilePath(name)
  const store = await vectorize(splitContent);
  await store.save(tempFilePath)
  const indexPath = path.join(tempFilePath, `hnswlib.index`);
  const docStorePath = path.join(tempFilePath, `docstore.json`);
  const indexData = await fs.promises.readFile(indexPath);
  const docStoreData = await fs.promises.readFile(docStorePath);

  const trainingIndex = await ServerData.createTrainingIndex({
    trainingSet,
    metaData: "",
    docStore: docStoreData,
    vectors: indexData,
    pending: false,
    id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    trainingSetId: trainingSet.id,
  });
  return trainingIndex;
}

// function getRedisKeys(name: string) {
//   invariant(name !== "local", "Cannot use 'local' as a name for a training index")
//   invariant(process.env.TEMP_FILE_PATH, "TEMP_FILE_PATH must be set to save redis training data")
//   invariant(process.env.REDIS_NAMESPACE, "REDIS_NAMESPACE must be set to save redis training data")
//   const vectors = path.join(process.env.REDIS_NAMESPACE, name, "vectors");
//   const documents = path.join(process.env.REDIS_NAMESPACE, name, "documents");
//   const metadata = path.join(process.env.REDIS_NAMESPACE, name, "metadata");
//   console.log("REDIS KEYS", { vectors, documents })
//   return {
//     vectors,
//     documents,
//     metadata
//   }
// }

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

  chunkSize: 1000, chunkOverlap: 0, separators: [" ", ",", "\n"]
})

async function splitFileData(data: string[]): Promise<string[]> {

  console.log("Splitting text into chunks...")
  let docs: string[] = [];
  for (const d of data) {
    const docOutput = await text_splitter.splitText(d);
    docs = [...docs, ...docOutput];
  }
  return docs;
}