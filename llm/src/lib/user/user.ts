import invariant from "tiny-invariant";
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

export async function getUserPublicChats(user: Pick<Participant, "email">): Promise<APIEnvelope<PublicChat[]>> {
  const publicChats = await redisClient.get(`public-chats:${user.email}`);
  return {
    success: true,
    data: JSON.parse(publicChats || "[]") as PublicChat[]
  }
}

export async function getUserPublicChat(id: string, user: Pick<Participant, "email">): Promise<APIEnvelope<PublicChat>> {
  const publicChat = await redisClient.get(`public-chats:${user.email}:${id}`);
  if (!publicChat) return {
    success: false,
    error: "Public chat not found"
  }
  return {
    success: true,
    data: JSON.parse(publicChat) as PublicChat
  };

}

export async function addUserPublicChat(user: Pick<Participant, "email">, publicChat: PublicChat): Promise<APIEnvelope<PublicChat>> {
  const { data: publicChats } = await getUserPublicChats(user);
  invariant(publicChats, "Cannot create public chat: Public chats not found");
  const trainingSet = await getUserTrainingSet(publicChat.trainingSet.id, user);
  if (!trainingSet) throw new Error("Cannot create public chat: Training set not found");
  const newPublicChat = {
    ...publicChat,
    trainingSet,
    id: generateId()
  }
  publicChats.push(newPublicChat);
  redisClient.set(`public-chats:${user.email}`, JSON.stringify(publicChats));
  redisClient.set(`public-chats:${user.email}:${newPublicChat.id}`, JSON.stringify(newPublicChat));
  return {
    success: true,
    data: newPublicChat
  }
}

export async function updateUserPublicChat(user: Pick<Participant, "email">, publicChat: PublicChat): Promise<APIEnvelope<PublicChat>> {
  const { data: publicChats } = await getUserPublicChats(user);
  invariant(publicChats, "Cannot update public chat: Public chats not found")
  const trainingSet = await getUserTrainingSet(publicChat.trainingSet.id, user);
  if (!publicChats.find(c => c.id === publicChat.id)) throw new Error("Public chat not found");
  const newPublicChats = publicChats.map(c => c.id === publicChat.id ? { ...publicChat, trainingSet } : c);
  redisClient.set(`public-chats:${user.email}`, JSON.stringify(newPublicChats));
  redisClient.set(`public-chats:${user.email}:${publicChat.id}`, JSON.stringify(publicChat));
  return {
    success: true,
    data: publicChat,
  }
}

export async function deleteUserPublicChat(user: Pick<Participant, "email">, publicChat: Partial<PublicChat>): Promise<APIEnvelope<PublicChat[]>> {
  const userPublicChat = await getUserPublicChat(publicChat.id!, user);
  if (!userPublicChat) throw new Error("Public chat not found");
  const { data: publicChats } = await getUserPublicChats(user);
  invariant(publicChats, "Cannot delete public chat: Public chats not found");
  const newPublicChats = publicChats.filter(c => c.id !== publicChat.id);
  redisClient.set(`public-chats:${user.email}`, JSON.stringify(newPublicChats));
  redisClient.del(`public-chats:${user.email}:${publicChat.id}`);
  try {
    if (publicChat.published) {
      await unpublishUserPublicChat(user, publicChat);
    }
  } catch (error) {
    console.log(error);
  }
  return {
    success: true,
    data: newPublicChats,
  }
}

export async function publishUserPublicChat(user: Pick<Participant, "email">, publicChat: Partial<PublicChat>): Promise<APIEnvelope<PublicChat>> {
  console.log(publicChat)
  const { data: publishablePublicChat } = await getUserPublicChat(publicChat.id!, user)
  invariant(publishablePublicChat)
  invariant(publishablePublicChat.trainingSet, "Cannot publish public chat: Training set not present on publicChat object")

  if (!publishablePublicChat) {
    return {
      success: false,
      error: "Public chat not found"
    }
  }
  /* OK */
  const { data: publishedPublicChat } = await updateUserPublicChat(user, { ...publishablePublicChat, trainingSetPath: `training-sets:${user.email}:${publishablePublicChat.trainingSet.id}`, published: true });
  invariant(publishedPublicChat, "Cannot publish public chat: Public chat not found after update")
  redisClient.set(`public-chats:${publishedPublicChat.id}`, JSON.stringify(publishedPublicChat));
  return {
    success: true,
    data: publishedPublicChat
  }
}

export async function unpublishUserPublicChat(user: Pick<Participant, "email">, publicChat: Partial<PublicChat>): Promise<APIEnvelope<PublicChat>> {
  const { data: unPublishablePublicChat } = await getUserPublicChat(publicChat.id!, user);
  if (!unPublishablePublicChat) throw new Error("Public chat not found");
  const { data: unpublishedPublicChat } = await updateUserPublicChat(user, { ...unPublishablePublicChat, published: false });
  redisClient.del(`public-chats:${unPublishablePublicChat.id}`);
  return {
    success: true,
    data: unpublishedPublicChat
  }
}

export async function getPublicChat(id: string) {
  console.log("HEY")
  const publicChat = await redisClient.get(`public-chats:${id}`);
  if (!publicChat) return {
    success: false,
    error: "Public chat not found"
  }
  return {
    success: true,
    data: JSON.parse(publicChat) as PublicChat
  };
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
  getUserPublicChats,
  getUserPublicChat,
  addUserPublicChat,
  updateUserPublicChat,
  deleteUserPublicChat,
  unpublishUserPublicChat,
  publishUserPublicChat,
  getPublicChat,
  scanRedis,

}