
import fs from 'fs'
import { CharacterTextSplitter } from "langchain/text_splitter";
import { HNSWLib } from "langchain/vectorstores";
import { OpenAIEmbeddings } from 'langchain/embeddings';
import { glob } from 'glob';
import urls from '../../training-data/urls';
import { RequestInfo, RequestInit } from "node-fetch";
import axios from 'axios';

const textSplitter = new CharacterTextSplitter({
  chunkSize: 2000,
  separator: "\n"
});

async function loadTrainingFileNames(): Promise<string[]> {
  const mdFiles = await glob("./src/training-data/**/*.md");
  const jsonFiles = await glob("./src/training-data/**/*.json");
  return [...mdFiles, ...jsonFiles];
}

async function loadTrainingFiles() {
  const files = await loadTrainingFileNames();
  const data = [];
  for (const file of files) {
    data.push(fs.readFileSync(file, 'utf-8'));
  }
  console.log(`Added ${files.length} files to data.`);
  return data;
}

async function loadRemoteTrainingData(): Promise<string[]> {
  console.log(`Loading data from ${urls.length} urls`)
  const data = [];
  for(let x=0;x<data.length;x++) {
    const url = urls[x];
    console.log(`Loading data from ${url}`)
    const response = await axios.get(url);
    const text = await response.data;
    data.push(text)
  }
  return data;
}

async function splitFileData(data: string[]): Promise<string[]> {
  console.log("Splitting text into chunks...")
  let docs: string[] = [];
  for (const d of data) {
    const docOutput = await textSplitter.splitText(d);
    docs = [...docs, ...docOutput];
  }
  return docs;
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

async function loadData() {
  const localData = await loadTrainingFiles();
  const remoteData = await loadRemoteTrainingData();
  const docs = await splitFileData([...localData, ...remoteData]);
  const store = await vectorize(docs);
  return store;
}

async function initalize() {
  console.log("Initializing Store...");
  const store = await loadData();
  console.log("Saving Vectorstore");
  await store.save("vectorStore")
  console.log("VectorStore saved!");
}

initalize();