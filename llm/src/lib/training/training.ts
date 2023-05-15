import fs from 'fs'
import * as dotenv from "dotenv";
import { HNSWLib } from "langchain/vectorstores";
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings';
import invariant from 'tiny-invariant';
import path from 'path';
import * as redis from 'redis';
import axios from 'axios';
import TurndownService from 'turndown';
import jsdom from 'jsdom';

const SUPPORTED_FILE_TYPES = ["md", "json", "txt"];

dotenv.config();

async function loadFile(file: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const data = fs.readFileSync(file, 'utf-8')
    resolve(data);
  });
}

async function loadUrl(url: string) {
  const response = await axios.get(url);
  if (response.status !== 200) throw new Error(`Failed to load url: ${url}`);
  const html = response.data;
  const doc = new jsdom.JSDOM(html).window.document;
  const htmlDoc = `<html><head><title>${doc.title}</title></head><body>${doc.body.innerHTML}</body></html>`
  const markdown = new TurndownService().turndown(htmlDoc)
  return markdown;
}

async function getSourceText(source: TrainingSource): Promise<string> {
  switch (source.type) {
    case "file":
      if (source!.content!.length > 0) return source.content!;
      return await loadFile(source.location);
    case "url":
      return await loadUrl(source.location);
    default:
      throw new Error(`Unsupported source type: ${source.type}`);
  }
}

export async function getTrainingIndex({ name, storageType }: { name: string, storageType: TrainingVectorStorageTypes }): Promise<HNSWLib> {
  invariant(name != "local", "Local cannot be used as a name.")
  switch (storageType) {
    case "local":
      const location = getLocalStoragePath(name);
      const localIndex = HNSWLib.load(location, new OpenAIEmbeddings());
      return localIndex;

    case "redis":
      console.log('getTrainingIndex', name)
      const client = redis.createClient({ url: process.env.REDIS_URL });
      client.commandOptions({ returnBuffers: true })
      await client.connect();
      const keys = getRedisKeys(name);
      const vectorsData = await client.get(keys.vectors);
      console.log(`(vectors) Got ${vectorsData?.length} bytes for ${name}`)
      const documentsData = await client.get(keys.documents);
      console.log(`(docStore) Got ${documentsData?.length} bytes for ${name}`)
      invariant(vectorsData, `No vectors found for ${name}`);
      invariant(documentsData, `No documents found for ${name}`);
      const tempFilePath = getTempFilePath(name);
      console.log("Saving index to files...", tempFilePath)
      if (!fs.existsSync(tempFilePath)) fs.mkdirSync(tempFilePath);
      const indexPath = path.join(tempFilePath, `hnswlib.index`);
      const docStorePath = path.join(tempFilePath, `docstore.json`);
      const argsFilePath = path.join(tempFilePath, `args.json`);
      fs.writeFileSync(indexPath, vectorsData, "binary")
      fs.writeFileSync(docStorePath, documentsData, "binary");
      fs.writeFileSync(argsFilePath, `{"space":"cosine","numDimensions":1536}`);
      const index = await HNSWLib.load(tempFilePath, new OpenAIEmbeddings())
      return index;
    default:
      throw new Error(`Unsupported storage type: ${storageType}`);
  }
}

export async function createTrainingIndex({ name, sources, storageType }: { name: string, sources: TrainingSource[], storageType: TrainingVectorStorageTypes }) {
  const allContent = await Promise.all(sources.map((source) => getSourceText(source)));
  const splitContent = await splitFileData(allContent);
  const store = await vectorize(splitContent);
  switch (storageType) {
    case "local":
      const location = getLocalStoragePath(name);
      await store.save(location)
      break;
    case "redis":
      const tempFilePath = getTempFilePath(name);
      if (!fs.existsSync(tempFilePath)) fs.mkdirSync(tempFilePath);
      console.log("Saving index to files...", tempFilePath)
      await store.save(tempFilePath)

      const client = redis.createClient({
        url: process.env.REDIS_URL
      })
      await client.connect();
      try {
        const keys = getRedisKeys(name);
        const indexPath = path.join(tempFilePath, `hnswlib.index`);
        const docStorePath = path.join(tempFilePath, `docstore.json`);
        let indexData = await fs.promises.readFile(indexPath);
        let docStoreData = await fs.promises.readFile(docStorePath);
        await Promise.all([
          console.log(`(Vectors) Sending ${indexData.byteLength} bytes of index data to redis...`),
          client.set(keys.vectors, indexData),
          console.log(`(DocStore) Sending ${docStoreData.byteLength} bytes of index data to redis...`),

          client.set(keys.documents, docStoreData)
        ]);
      } finally {
        await client.disconnect();
      }
  }

}

export async function updateTrainingIndex({ }: { name: string, sources: TrainingSource[], storageType: TrainingVectorStorageTypes }) {
  // TODO
}

function getLocalStoragePath(name: string) {
  invariant(process.env.LOCAL_STORAGE_PATH, "LOCAL_STORAGE_PATH must be set to save local training data")
  const location = path.join(process.env.LOCAL_STORAGE_PATH, `${name}`)
  return location;
}
function getTempFilePath(name: string) {
  return path.join(process.env.TEMP_FILE_PATH!, `${name}-${new Date().getTime()}`);
}

function getRedisKeys(name: string) {
  invariant(name !== "local", "Cannot use 'local' as a name for a training index")
  invariant(process.env.TEMP_FILE_PATH, "TEMP_FILE_PATH must be set to save redis training data")
  invariant(process.env.REDIS_NAMESPACE, "REDIS_NAMESPACE must be set to save redis training data")
  const vectors = path.join(process.env.REDIS_NAMESPACE, name, "vectors");
  const documents = path.join(process.env.REDIS_NAMESPACE, name, "documents");
  console.log("REDIS KEYS", { vectors, documents })
  return {
    vectors,
    documents
  }
}

async function vectorize(docs: string[]): Promise<HNSWLib> {
  if (docs.length === 0) throw new Error("No documents to vectorize!");
  const store = await HNSWLib.fromTexts(
    docs,
    docs.map((_, i) => ({ id: i })),
    new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      // modelName: 'gpt-3.5-turbo'
    })
  )
  return store;
}

const textSplitter = new CharacterTextSplitter({
  chunkSize: 2000,
  separator: "\n"
});

async function splitFileData(data: string[]): Promise<string[]> {

  console.log("Splitting text into chunks...")
  let docs: string[] = [];
  for (const d of data) {
    const docOutput = await textSplitter.splitText(d);
    docs = [...docs, ...docOutput];
  }
  return docs;
}