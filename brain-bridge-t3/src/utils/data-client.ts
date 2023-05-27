"use client";
import { type PublicChat, type TrainingSet } from "@prisma/client";
import { type MessageWithRelations, type ConversationWithRelations, type TrainingSetWithRelations, type TrainingIndexWithRelations, PublicChatWithRelations } from "~/interfaces/types";

const makeApiUrl = (endpoint: string) => {
  const base = process.env.NEXT_PUBLIC_URL
  return new URL(endpoint, base).toString();
}

async function fetchTrainingSet(trainingSetId: string): Promise<TrainingSetWithRelations> {
  const response = await fetch(makeApiUrl(`/profile/training/api/${trainingSetId}`))
  const data = await response.json() as TrainingSetWithRelations;
  return data
}

async function createTrainingSet(trainingSet: TrainingSetWithRelations) {
  const response = await fetch(makeApiUrl("/profile/training/api"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trainingSet),
  })
  const data = await response.json() as TrainingSetWithRelations;
  return data
}

async function deleteTrainingSet(trainingSetId: string): Promise<{ success: boolean }> {
  await fetch(makeApiUrl(`/profile/training/api/${trainingSetId}`), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return {
    success: true,
  }
}

async function updateTrainingSet(trainingSet: TrainingSet) {
  const response = await fetch(makeApiUrl(`/profile/training/api/${trainingSet.id}`), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trainingSet),
  })
  const data = await response.json() as TrainingSetWithRelations;
  return data
}

async function trainTrainingSet(trainingSetId: string): Promise<TrainingIndexWithRelations> {
  const response = await fetch(makeApiUrl(`/profile/training/api/${trainingSetId}/train`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await response.json() as TrainingIndexWithRelations;
  return data;
}

async function fetchChats(): Promise<ConversationWithRelations[]> {
  const response = await fetch(makeApiUrl(`/profile/training/api/chat`))
  const data = await response.json() as ConversationWithRelations[];
  return data
}

async function clearChat(chatId: string): Promise<ConversationWithRelations> {
  const response = await fetch(makeApiUrl(`/profile/chat/${chatId}/api/messages`), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await response.json() as ConversationWithRelations;
  return data;
}

async function newChat(trainingSetId: string): Promise<ConversationWithRelations> {
  const response = await fetch(makeApiUrl(`/profile/chats/api`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      trainingSetId
    })
  })
  const data = await response.json() as ConversationWithRelations;
  return data
}

async function deleteChat(chatId: string): Promise<{ success: boolean }> {
  await fetch(makeApiUrl(`/profile/chat/${chatId}/api`), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return {
    success: true,
  }
}

async function createPublicChat(publicChat: PublicChat) {
  const response = await fetch(makeApiUrl("/profile/public-chats/api"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(publicChat),
  })
  const data = await response.json() as PublicChat;
  return data 
}

async function updatePublicChat(publicChat: PublicChatWithRelations) {
  const response = await fetch(makeApiUrl(`/profile/public-chats/api/${publicChat.id}`), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(publicChat),
  })
  const data = await response.json() as PublicChat;
  return data 
}

async function unpublishPublicChat(publicChat: PublicChatWithRelations) {
  await updatePublicChat({
    ...publicChat,
    published: false,
  })
  return {
    ...publicChat,
    published: false,
  }
}

async function publishPublicChat(publicChat: PublicChatWithRelations) {
  await updatePublicChat({
    ...publicChat,
    published: true,
  })
  return {
    ...publicChat,
    published: false,
  }
}

async function sendMessage(message: MessageWithRelations) {
  const response = await fetch(makeApiUrl(`/profile/chat/${message.conversationId}/api/message`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...message, conversation: { id: message.conversationId } }),
  })
  const text = await response.text();
  const data = JSON.parse(text) as MessageWithRelations;
  return data
}

const DataClient = {
  fetchTrainingSet,
  createTrainingSet,
  updateTrainingSet,
  deleteTrainingSet,
  trainTrainingSet,
  fetchChats,
  clearChat,
  newChat,
  deleteChat,
  sendMessage,
  createPublicChat,
  updatePublicChat,
  unpublishPublicChat,
  publishPublicChat,
}

export default DataClient;