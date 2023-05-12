import express from 'express';
import cors from 'cors';
import generateResponse, { loadStore } from '../lib/generate-response';
import { HNSWLib } from 'langchain/vectorstores';
import bodyParser from 'body-parser';

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

export const conversationHistory: string[] = [];

class Conversation {
  id: number;
  messages: string[];
  constructor(id: number, messages: string[]) {
    this.id = id;
    this.messages = messages;
  }

  async add(message: string) {
    this.messages.push(`human: ${message}`);
    const response = await generateResponse({
      prompt: message,
      history: this.messages,
      store: (store as HNSWLib)
    });
    this.messages.push(`Seth Webster: ${response}`);
    console.log(this.messages)
    return {message: response, id: this.length()};
  }

  length() {
    return this.messages.length;
  }

  static fromJSON(json: any): Conversation {
    return new Conversation(json.id, json.messages);
  }

  toJSON(): any {
    return {
      id: this.id,
      messages: this.messages,
    }
  }
}

const conversation = new Conversation(1, []);

let store: HNSWLib | null = null;
app.put("/api/chat/:id", async (req, res) => {
  const { message } = req.body;
  const response = await conversation.add(message);  
  res.json(response);
});

loadStore().then((loadedStore) => {
  store = loadedStore;
  app.listen(4000, () =>
    console.log('Example app listening on port 4000!'),
  )
});