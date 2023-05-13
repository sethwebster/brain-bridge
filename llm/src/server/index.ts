import express from 'express';
import cors from 'cors';
import { loadStore } from '../lib/generate-response';
import { HNSWLib } from 'langchain/vectorstores';
import bodyParser from 'body-parser';
import Conversation from '../lib/chat/conversation';
import invariant from 'tiny-invariant';
import { addUserConversation, getUserConversations } from '../lib/user/user';

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('This api is not intended to be called.');
});

const conversations = new Map<string, Conversation>();

let store: HNSWLib | null = null;

app.get("/api/chats/:email", async (req, res) => {
  const { email } = req.params;
  const conversations = await getUserConversations({ email }) || []
  res.json(conversations);
});

// Retrievies a conversation
app.get("/api/chat/:id", async (req, res) => {
  console.log("HEY")
  const { id } = req.params;
  let conversation = conversations.get(id)
  console.log('conversation loaded from memory', conversation)

  if (!conversation) {
    try {
      conversation = await Conversation.fromRedis(id);
      console.log('conversation loaded from redis', conversation)
      conversations.set(id, conversation);
    } catch {
      res.status(404).send("Conversation not found");
    }
  }
  res.json(conversations.get(id));
});


// Creates a new conversation
app.post("/api/chat", async (req, res) => {
  const { corpus, user } = req.body;
  const id = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
  const conversation = new Conversation(id, corpus);
  conversation.join({ ...user, participantType: 'user' });
  conversation.join({ id: 'bot', name: 'Seth Webster', email: 'sethwebster@gmail.com', participantType: 'bot' })
  conversations.set(id, conversation);
  await addUserConversation(user, { id, name: null } as any);
  res.json(conversations.get(id));
});

// posts a message
app.put("/api/chat/:id/message", async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  let conversation = conversations.get(id);
  if (!conversation) {
    try {
      conversation = await Conversation.fromRedis(id);
      conversations.set(id, conversation);
    } catch (e) {
      res.status(404).send("Conversation not found");
    }
  }
  invariant(conversation, 'Conversation should be defined');
  await awaitReady(conversation);
  const response = await conversation.add(message);
  res.json(response);
});

const awaitReady = async (conversation: Conversation) => {
  if (conversation.isReady) return;
  return new Promise((resolve) => {
    let interval = setInterval(() => {
      console.log('checking if conversation is ready', conversation.isReady);
      if (conversation.isReady) {
        clearInterval(interval);
        resolve(conversation);
      }
    }, 100); // check every 100ms
  });

}

loadStore().then((loadedStore) => {
  store = loadedStore;
  app.listen(4000, () =>
    console.log('Example app listening on port 4000!'),
  )
});