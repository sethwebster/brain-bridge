import redisClient from "../redis/client";
import { generateId } from "../utils/identity";

export async function getUserConversations(user: Pick<Participant, "email">): Promise<ConversationStub[]> {
  const conversations = await redisClient.get(`conversations:${user.email}`);
  return JSON.parse(conversations || "[]") as ConversationStub[];
}

export async function addUserConversation(user: Pick<Participant, "email">, conversation: ConversationStub) {
  const conversations = await getUserConversations(user);
  conversations.push(conversation);
  redisClient.set(`conversations:${user.email}`, JSON.stringify(conversations));
  return conversations;
}

export async function removeUserConversation(user: Pick<Participant, "email">, conversation: ConversationStub) {
  const conversations = await getUserConversations(user);
  const newConversations = conversations.filter(c => c.id !== conversation.id);
  redisClient.set(`conversations:${user.email}`, JSON.stringify(newConversations));
  return newConversations;
}

export async function updateUserConversation(user: Pick<Participant, "email">, conversation: ConversationStub) {
  const conversations = await getUserConversations(user);
  const newConversations = conversations.map(c => c.id === conversation.id ? conversation : c);
  redisClient.set(`conversations:${user.email}`, JSON.stringify(newConversations));
  return newConversations;
}

export async function getUserTrainingSets(user: Pick<Participant, "email">) {
  const data = await redisClient.get(`training-sets:${user.email}`);
  if (!data) return [];
  const sets = JSON.parse(data) as TrainingSetStub[];
  return sets;
}

export async function getUserTrainingSet(id: string, user: Pick<Participant, "email">) {
  const data = await redisClient.get(`training-sets:${user.email}:${id}`);
  if (!data) return null;
  const set = JSON.parse(data) as TrainingSet;
  return set;
}

export async function addUserTrainingSet(user: Pick<Participant, "email">, set: TrainingSet) {
  const sets = await getUserTrainingSets(user);
  const updated = { ...set, id: generateId(16), dateCreated: new Date(), version: 0 };
  const stub = { ...updated } as TrainingSetStub & { sources?: TrainingSource[] };
  delete stub.sources;
  sets.push(stub);
  redisClient.set(`training-sets:${user.email}`, JSON.stringify(sets));
  redisClient.set(`training-sets:${user.email}:${updated.id}`, JSON.stringify(updated));
  console.log("added training set", updated)
  return updated;
}

export async function updateUserTrainingSet(user: Pick<Participant, "email">, set: TrainingSet) {
  const sets = await getUserTrainingSets(user);
  const updated = { ...set, dateUpdated: new Date(), version: set.version + 1 };
  const newSets = sets.map(s => s.id === set.id ? updated : s);
  redisClient.set(`training-sets:${user.email}`, JSON.stringify(newSets));
  redisClient.set(`training-sets:${user.email}:${set.id}`, JSON.stringify(updated));
  return updated;
}

export async function deleteUserTrainingSet(user: Pick<Participant, "email">, set: Partial<TrainingSetStub>) {
  const sets = await getUserTrainingSets(user);
  const newSets = sets.filter(s => s.id !== set.id);
  redisClient.set(`training-sets:${user.email}`, JSON.stringify(newSets));
  redisClient.del(`training-sets:${user.email}:${set.id}`);
  return newSets;
}

async function scanRedis(pattern: string) {
  let cursor = 0;
  const found: string[] = [];
  const scan = async (pattern: string) => {
    do {
      // console.log("Found", found)
      const response = await redisClient.scan(cursor, { MATCH: pattern, COUNT: 10000 });
      // console.log(response);
      cursor = Number(response.cursor);
      found.push(...response.keys);
    } while (cursor !== 0);
    return found;
  }
  return await scan(pattern);
}

export default {
  getUserConversations,
  addUserConversation,
  removeUserConversation,
  updateUserConversation,
  getUserTrainingSets,
  getUserTrainingSet,
  addUserTrainingSet,
  updateUserTrainingSet,
  deleteUserTrainingSet,
}