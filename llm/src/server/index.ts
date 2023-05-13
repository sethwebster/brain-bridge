import express from 'express';
import cors from 'cors';
import { loadStore } from '../lib/generate-response';
import { HNSWLib } from 'langchain/vectorstores';
import bodyParser from 'body-parser';
import Conversation from '../lib/chat/conversation';
import invariant from 'tiny-invariant';
import { addUserConversation, getUserConversations, removeUserConversation } from '../lib/user/user';

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('This api is not intended to be called.');
});

const conversations = new Map<string, Conversation>();

let store: HNSWLib | null = null;

async function getConversation(id: string) {
  let conversation = conversations.get(id) 

  if (!conversation) {
    try {
      conversation = await Conversation.fromRedis(id);
      console.log('conversation loaded from redis', id)
      conversations.set(id, conversation);
    } catch {
      throw new Error("Conversation not found");
    }
  } else {
    console.log('conversation loaded from memory', id)
  }
  return conversation;
}

app.get("/api/chats/:email", async (req, res) => {
  const { email } = req.params;
  const conversations = await getUserConversations({ email }) || []
  res.json(conversations);
});

// Retrievies a conversation
app.get("/api/chat/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const conversation = await getConversation(id);
    res.json(conversations.get(id));
  } catch {
    res.status(404).send("Conversation not found");
  }


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
  try {
    const conversation = await getConversation(id);
    await awaitReady(conversation);
    const response = await conversation.add(message);
    res.json(response);
  } catch (e) {
    console.log(e);
    res.status(404).send("Conversation not found");
  }
});

app.delete("/api/chats/:email/:id", async (req, res) => {
  const { id, email } = req.params;
  req.headers['x-api-key']
  const conversation = await getConversation(id)
  if (!conversation) {
    res.status(404).send("Conversation not found");
    return;
  }
  conversations.delete(id);
  removeUserConversation({ email }, { id, name: null });
  res.status(204).send();

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

app.listen(4000, () =>
  console.log('Example app listening on port 4000!'),
)
