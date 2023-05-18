import express from 'express';
import cors from 'cors';
import { loadStore } from '../lib/generate-response';
import { HNSWLib } from 'langchain/vectorstores';
import bodyParser from 'body-parser';
import Conversation from '../lib/chat/conversation';
import invariant from 'tiny-invariant';
import { addUserConversation, getUserTrainingSets, getUserConversations, removeUserConversation, addUserTrainingSet, updateUserTrainingSet, deleteUserTrainingSet, getUserTrainingSet, getUserPublicChats, addUserPublicChat, updateUserPublicChat, publishUserPublicChat, deleteUserPublicChat, unpublishUserPublicChat, getUserPublicChat } from '../lib/user/user';
import { generateId } from '../lib/utils/identity';
import { OpenAIChat } from 'langchain/llms';
import { createTrainingIndex } from '../lib/training/training';
import Mutex from './mutex';
import fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';
const app = express();
console.log(__dirname)
console.log(__filename)
app.use(express.static(process.env.AUDIO_STORAGE_PATH!));
app.use(cors())
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}]: ${req.method} ${req.url}`)
  next();
})
app.get('/', (req, res) => {
  res.send('This api is not intended to be called.');
});

const conversations = new Map<string, Conversation>();

let store: HNSWLib | null = null;

async function pruneConversations() {
  console.log('pruning conversations')
  conversations.forEach((conversation, id) => {
    const oneHour = 1000 * 60 * 60;
    const tenMinutes = 1000 * 60 * 10;
    if (conversation.lastUpdate < new Date(Date.now() - tenMinutes)) {
      console.log('pruning conversation', id)
      conversations.delete(id);
    }
  });
  setTimeout(pruneConversations, 1000 * 60);
}
pruneConversations();

const mutex = new Mutex();

async function getConversation(id: string) {
  await mutex.lock()
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
  mutex.unlock();
  return conversation;
}

/**
 * Answers a question without the langchain model. This is plain old ChatGPT
 */
app.post("/api/llm/question", async (req, res) => {
  const { question } = req.body;
  invariant(question, "Question is required");
  const model = new OpenAIChat({
    temperature: 0.2,
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: 'gpt-3.5-turbo'
  });
  model.call(question).then((result) => {
    res.json(result);
  });
});

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
  console.log("creating conversation", corpus, user)
  const trainingSet = await getUserTrainingSet(corpus, { email: user.email });
  invariant(trainingSet, "Training set not found");
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

// Deletes a conversation
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

app.get("/api/training-sets/:email", async (req, res) => {
  const sets = await getUserTrainingSets({ email: req.params.email });
  res.json(sets);
})

app.post("/api/training-sets/:email", async (req, res) => {
  const { email } = req.params;
  const set = {
    ...req.body,
  } as TrainingSet;
  res.json(await addUserTrainingSet({ email }, set));
});

app.put("/api/training-sets/:email/:id", async (req, res) => {
  const { email, id } = req.params;
  const set = req.body as TrainingSet;
  set.sources = set.sources.map((source) => ({ ...source, pending: false }))

  await updateUserTrainingSet({ email }, set);
  res.json(set);
});

app.get("/api/training-sets/:email/:id", async (req, res) => {
  const { email, id } = req.params;
  const resp = await getUserTrainingSet(id, { email })
  res.json(resp);
});

app.delete("/api/training-sets/:email/:id", async (req, res) => {
  const { email, id } = req.params;
  await deleteUserTrainingSet({ email }, { id });
  res.status(204).send();
});

app.post("/api/training-sets/:email/:id/train", async (req, res) => {
  const { email, id } = req.params;
  try {
    const trainingSet = await getUserTrainingSet(id, { email });
    invariant(trainingSet, "Training set not found");
    invariant(trainingSet.id, "Training set id is required")
    console.log("Creating training set", id)
    await createTrainingIndex({
      name: trainingSet?.id,
      trainingSet: trainingSet,
      storageType: 'redis',
    })
    res.json(trainingSet);
  } catch (e: any) {
    console.log(e);
    res.status(500).send({ error: e.message });
  }
});

app.post("/api/chat/:id/voice", async (req, res) => {
  const { text } = req.body;
  const fileName = hash(text) + ".mpg";
  invariant(process.env.AUDIO_STORAGE_PATH, "AUDIO_STORAGE_PATH is required")
  const basePath = path.join(process.env.AUDIO_STORAGE_PATH, "audio");
  await fs.mkdir(basePath, { recursive: true }, (err, path) => {
    if (err) console.log("Failed to make directory", err)
    if (path) console.log("Path created, or ok", path);
  });
  const fileDestination = path.join(basePath, fileName);
  if (!fs.existsSync(fileDestination)) {
    invariant(process.env.ELEVENLABS_API_KEY, "ELEVENLABS_API_KEY is required")
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVENLABS_VOICE_ID}?optimize_streaming_latency=0`, {
      method: 'POST',
      headers: {
        'accept': 'audio/mpeg',
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.68,
          similarity_boost: 0.83,
        }
      })
    });
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(fileDestination, Buffer.from(buffer));
    console.log("File written to", fileDestination)
  }
  res.json({ file: '/audio/' + fileName })
});

app.get("/api/chat/:id/voice/:file", async (req, res) => {
  const { file } = req.params;
  const filePath = path.join(process.env.TEMP_FILE_PATH!, file);
  if (!fs.existsSync(filePath)) {
    res.status(404).send();
    return;
  }
  res.sendFile(filePath);
});

function hash(text: string) {
  return createHash('sha256').update(text).digest('hex');
}

/**
 * Get's the user's public chats
 */
app.get("/api/:email/public-chats", async (req, res) => {
  const { email } = req.params;
  const conversations = await getUserPublicChats({ email });
  res.json(conversations);
});

/**
 * Get's the user's public chats
 */
app.get("/api/:email/public-chats/:id", async (req, res) => {
  const { email, id } = req.params;
  const conversations = await getUserPublicChat(id, { email });
  res.json(conversations);
});

/** Create's a User's public chat */
app.post("/api/:email/public-chats", async (req, res) => {
  const { email } = req.params;
  const publicChat = req.body as PublicChat
  const newPublicChat = await addUserPublicChat({ email }, publicChat);
  res.json(newPublicChat);
});

/**
 * Updates a User's public chat
 */
app.put("/api/:email/public-chats/:id", async (req, res) => {
  const { email, id } = req.params;
  const publicChat = req.body as PublicChat;
  const updatedPublicChat = await updateUserPublicChat({ email }, { ...publicChat, id });
  res.json(updatedPublicChat);
});

/**
 * Publishes a User's public chat
 */
app.put("/api/:email/public-chats/:id/publish", async (req, res) => {
  const { email, id } = req.params;
  const updatedPublicChat = await publishUserPublicChat({ email }, { id });
  res.json(updatedPublicChat);
});

/**
 * Deletes and unpublishes User's public chat
 */
app.delete("/api/:email/public-chats/:id", async (req, res) => {
  const { email, id } = req.params;
  const data = await deleteUserPublicChat({ email }, { id });
  res.status(204).json(data);
});

/**
 * Unpublishes a User's public chat
 */
app.delete("/api/:email/public-chats/:id/publish", async (req, res) => {
  const { email, id } = req.params;
  await unpublishUserPublicChat({ email }, { id });
  res.status(204).send();
});


const awaitReady = async (conversation: Conversation) => {
  return;
  if (conversation.isReady) return;
  const start = new Date();
  return new Promise((resolve) => {
    let interval = setInterval(() => {
      if (new Date().getTime() - start.getTime() > 30000) {
        resolve(conversation);
      }
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
