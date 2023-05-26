import fs from 'fs'
import { HNSWLib } from "langchain/vectorstores";
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings';
import path from 'path';
import jsdom from 'jsdom';
import { type TrainingIndex, type TrainingSource } from '@prisma/client';
import { type TrainingSetWithRelations } from '~/interfaces/types';
import ServerData from '~/server/data';
import { cleanUpHtml } from '~/utils/html-to-markdown';

async function loadFile(file: string): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log(path.extname(file));
    const data = fs.readFileSync(file, 'utf-8')
    resolve(data);
  });
}

async function loadUrl(url: string): Promise<string> {
  const response = await fetch(url);
  if (response.status !== 200) throw new Error(`Failed to load url: ${url}`);
  const html = await response.text();
  const headerRaw = response.headers.get('content-type') ?? "text/html";
  const contentType = headerRaw.split(';')[0];
  switch (contentType) {
    case "text/html":
      const doc = new jsdom.JSDOM(html).window.document;

      const htmlDoc = `<html><head><title>${doc.title}</title></head><body>${doc.body.innerHTML}</body></html>`
      /* Parse the HTML into markdown, and remove any bloks of script */
      const markdown = cleanUpHtml(htmlDoc) ;
      console.log("Markdown", '"' + markdown + '"');
      return markdown;
    case "application/json":
    case "text/plain":
      return html;
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
      return await loadUrl(source.name);
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

// export async function getTrainingIndex({ name, storageType }: { name: string, storageType: TrainingVectorStorageTypes }): Promise<TrainingIndex> {
//   console.log('getTrainingIndex', name, storageType)
//   //TODO: Eventually remove this
//   invariant(name != "local", "Local cannot be used as a name.")
//   switch (storageType) {
//     case "local":
//       const location = getLocalStoragePath(name);
//       const localIndex = HNSWLib.load(location, new OpenAIEmbeddings());
//       // TODO - fix this - we want to allow non-redis storage
//       // @ts-ignore
//       return localIndex;

//     case "redis":
//       console.log('REDIS', name)
//       const client = redis.createClient({ url: process.env.REDIS_URL });
//       console.log("Created Redis client")
//       client.commandOptions({ returnBuffers: true })
//       console.log("Connecting to redis")
//       await client.connect();
//       console.log("Connected to redis")
//       const keys = getRedisKeys(name);
//       const metadataStr = await client.get(keys.metadata);
//       invariant(metadataStr, `No metadata found for ${name}`);
//       const metadata = JSON.parse(metadataStr.toString());
//       // console.log("Fetching vectors", metadata)
//       const vectorsData = await client.get(metadata.storageKeys.vectors);
//       console.log(`(vectors) Got ${vectorsData?.length} bytes for ${name}`)
//       const documentsData = await client.get(metadata.storageKeys.documents);
//       console.log(`(docStore) Got ${documentsData?.length} bytes for ${name}`)
//       invariant(vectorsData, `No vectors found for ${name}`);
//       invariant(documentsData, `No documents found for ${name}`);
//       const tempFilePath = getTempFilePath(name);
//       console.log("Saving index to files...", tempFilePath)
//       const { index: { data: indexData } } = JSON.parse(vectorsData.toString());
//       const { documents: { data: docsData } } = JSON.parse(documentsData.toString());
//       if (!fs.existsSync(tempFilePath)) fs.mkdirSync(tempFilePath);
//       const indexPath = path.join(tempFilePath, `hnswlib.index`);
//       const docStorePath = path.join(tempFilePath, `docstore.json`);
//       const argsFilePath = path.join(tempFilePath, `args.json`);
//       fs.writeFileSync(indexPath, Buffer.from(indexData));
//       fs.writeFileSync(docStorePath, Buffer.from(docsData));
//       fs.writeFileSync(argsFilePath, `{"space":"cosine","numDimensions":1536}`);
//       const index = await HNSWLib.load(tempFilePath, new OpenAIEmbeddings())
//       metadata.store = index;
//       return metadata;
//     default:
//       throw new Error(`Unsupported storage type: ${storageType}`);
//   }
// }

// export async function updateTrainingIndex({ }: { name: string, sources: TrainingSource[], storageType: TrainingVectorStorageTypes }) {
//   // TODO
// }

// function getLocalStoragePath(name: string) {
//   invariant(process.env.LOCAL_STORAGE_PATH, "LOCAL_STORAGE_PATH must be set to save local training data")
//   const location = path.join(process.env.LOCAL_STORAGE_PATH, `${name}`)
//   return location;
// }

function getTempFilePath(name: string) {
  return path.join(process.env.TEMP_FILE_PATH!, `${name}-${new Date().getTime()}`);
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
  chunkOverlap: 0,
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