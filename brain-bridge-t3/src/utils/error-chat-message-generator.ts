import { type MessageWithRelations } from "~/server/interfaces/types";
import generateId from "./generate-id";

export default function generateChatErrorMessage(error: string): MessageWithRelations {
  return {
    id: generateId(),
    conversationId: generateId(),
    conversation: null,
    participantId: "",
    createdAt: new Date(),
    publicChatInstance: null,
    publicChatInstanceId: null,
    sender: {
      conversationId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: generateId(),
      name: "system",
      type: "BOT",
      publicChatInstanceId: null,
    },
    text: error
      ? `❌ So sorry! It looks like we failed to get a respone to your message. We're working on it! Message: "${error}"`
      : `❌ So sorry! It looks like we failed to get a respone to your message. We're working on it!`,
  }
} 
