import { ConversationWithRelations, PublicChatInstanceWithRelations, conversationWithRelations, publicChatInstanceWithRelations } from "../api-v1/sockets/types.ts";
import { prisma } from "./db.ts";

async function fetchConversationWithRelations(id: string): Promise<ConversationWithRelations | null> {
  return await prisma.conversation.findUnique({
    where: {
      id
    },
    ...conversationWithRelations
  })
}

async function fetchPublicChatInstanceWithRelations(id: string): Promise<PublicChatInstanceWithRelations | null> {
  return await prisma.publicChatInstance.findUnique({
    where: {
      id
    },
    ...publicChatInstanceWithRelations
  })
}

const ServerData = {
  fetchConversationWithRelations,
  fetchPublicChatInstanceWithRelations
}


export default ServerData;
