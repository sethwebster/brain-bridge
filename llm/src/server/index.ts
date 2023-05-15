import express from 'express';
import cors from 'cors';
import { loadStore } from '../lib/generate-response';
import { HNSWLib } from 'langchain/vectorstores';
import bodyParser from 'body-parser';
import Conversation from '../lib/chat/conversation';
import invariant from 'tiny-invariant';
import { addUserConversation, getUserTrainingSets, getUserConversations, removeUserConversation, addUserTrainingSet, updateUserTrainingSet, deleteUserTrainingSet, getUserTrainingSet } from '../lib/user/user';
import { generateId } from '../lib/utils/identity';
import { OpenAIChat } from 'langchain/llms';
import { createTrainingIndex } from '../lib/training/training';

const app = express();
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
