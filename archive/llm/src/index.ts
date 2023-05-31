import promptSync from 'prompt-sync';
import generateResponse, { loadStore } from './lib/generate-response';
import { HNSWLib } from 'langchain/vectorstores';
import { getTrainingIndex } from './lib/training/training';

const prompt = promptSync();

const conversationHistory: string[] = [];

async function loop(store: HNSWLib) {

  // const initial = await generateResponse({
  //   prompt: "Introduce yourself",
  //   history: conversationHistory,
  //   store
  // });
  // console.log(`Seth: ${initial}\n`);
  // while (true) {
  //   const question = prompt("Ask a question >");
  //   const answer = await generateResponse({
  //     prompt: question,
  //     history: conversationHistory,
  //     store
  //   });
  //   console.log(`Seth: ${answer}\n`);

  //   // conversationHistory.push(`Human: ${question}`, `Seth Webster: ${answer}`)
  //   conversationHistory.push(`Human: ${question}`, `Seth Webster: ${answer}`)
  // }
}

// getTrainingIndex({ name: "local", storageType: 'redis' }).then(store => {
//   loop(store);
// });

// loadStore().then(store => {
// });
