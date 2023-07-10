"use client";
import { type PublicChat, type TrainingSet } from "@prisma/client";
import { type MessageWithRelations, type ConversationWithRelations, type TrainingSetWithRelations, type PublicChatWithRelations } from "@/data/interfaces/types";

type ApiUrl = `/api/${string}`

const makeApiUrl = (endpoint: ApiUrl) => {
  const base = process.env.NEXT_PUBLIC_BASE_URL
  return new URL(endpoint, base).toString();
}

async function fetchTrainingSet(trainingSetId: string): Promise<TrainingSetWithRelations> {
  const response = await fetch(makeApiUrl(`/api/training/${trainingSetId}`))
  const data = await response.json() as TrainingSetWithRelations;
  return data
}

async function createTrainingSet(trainingSet: TrainingSetWithRelations) {
  const response = await fetch(makeApiUrl("/api/training"), {
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
  await fetch(makeApiUrl(`/api/training/${trainingSetId}`), {
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
  const response = await fetch(makeApiUrl(`/api/training/${trainingSet.id}`), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trainingSet),
  })
  const data = await response.json() as TrainingSetWithRelations;
  return data
}

async function fetchChats(): Promise<ConversationWithRelations[]> {
  const response = await fetch(makeApiUrl(`/api/training/chat`))
  const data = await response.json() as ConversationWithRelations[];
  return data
}


async function fetchChat(chatId: string): Promise<ConversationWithRelations> {
  const response = await fetch(makeApiUrl(`/api/chat/${chatId}`), { method:"GET" })
  const data = await response.json() as ConversationWithRelations;
  return data;
}

async function clearChat(chatId: string): Promise<ConversationWithRelations> {
  const response = await fetch(makeApiUrl(`/api/chat/${chatId}/messages`), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await response.json() as ConversationWithRelations;
  return data;
}

async function fetchMessages(chatId: string): Promise<MessageWithRelations[]> {
  const response = await fetch(makeApiUrl(`/api/chat/${chatId}/messages`), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await response.json() as { messages: MessageWithRelations[] };
  return data.messages;
}

async function clearPublicChatMessages(publicChatId: string): Promise<PublicChatWithRelations> {
  const response = await fetch(makeApiUrl(`/api/public-chats/${publicChatId}/messages`), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await response.json() as PublicChatWithRelations;
  return data;
}

async function newChat(trainingSetId: string): Promise<ConversationWithRelations> {
  const response = await fetch(makeApiUrl(`/api/chats`), {
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
  await fetch(makeApiUrl(`/api/chat/${chatId}`), {
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
  const response = await fetch(makeApiUrl("/api/public-chats"), {
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
  const response = await fetch(makeApiUrl(`/api/public-chats/${publicChat.id}`), {
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

async function deletePublicChat(publicChatId: string): Promise<void> {
  await fetch(makeApiUrl(`/api/public-chats/${publicChatId}`), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
}

async function getSignedUrl(fileName: string, trainingSetId: string): Promise<{ url: string }> {
  const response = await fetch(makeApiUrl(`/api/files/sign`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fileNameKey: fileName, trainingSetId }),
  })
  const data = await response.json() as { url: string };
  return data;
}

async function verifyToken(token: string): Promise<{ valid: boolean }> {
  const response = await fetch(makeApiUrl(`/api/tokens`), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  })
  const data = await response.json() as { valid: boolean };
  return data;
}

async function getToken() {
  const response = await fetch(makeApiUrl(`/api/tokens`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await response.json() as { token: string };
  return data;
}

async function getAnonymousToken() {
  const response = await fetch(makeApiUrl(`/api/tokens/anonymous`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await response.json() as { token: string };
  return data;
}

const DataClient = {
  fetchTrainingSet,
  createTrainingSet,
  updateTrainingSet,
  deleteTrainingSet,
  fetchChat,
  fetchChats,
  fetchMessages,
  clearChat,
  clearPublicChatMessages,
  newChat,
  deleteChat,
  createPublicChat,
  updatePublicChat,
  unpublishPublicChat,
  publishPublicChat,
  deletePublicChat,
  getSignedUrl,
  getToken,
  verifyToken,
  getAnonymousToken
}

export default DataClient;