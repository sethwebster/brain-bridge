import redisClient from "../redis/client";

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

export default {
  getUserConversations,
  addUserConversation,
  removeUserConversation,
  updateUserConversation
}