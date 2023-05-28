import { type Conversation, type Participant } from "@prisma/client";
import { type ChatResponseMode, type MessageWithRelations } from "~/interfaces/types";
import { type Session } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";
import invariant from "tiny-invariant";
import { getServerSession } from "~/server/auth";
import { prisma } from '~/server/db';
import ServerData from '~/server/data';
import { BrainBridgeLangChain } from '~/lib/llm';

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  invariant(session, "User must be logged in to send a message");
  const { message, mode } = await req.json() as { message: MessageWithRelations, mode: ChatResponseMode };
  console.log("mode", mode, message)
  invariant(message.conversationId, "Conversation id must be provided");
  const conversation = await ServerData.fetchChat(message.conversationId);
  invariant(conversation, "Conversation must exist");
  const bot = conversation.participants.find(p => p.name === "Bot");
  invariant(bot, "Bot must exist");

  const userMessage = await storeUserMessage(conversation, message, session);
  const llm = new BrainBridgeLangChain();
  const response = await llm.getLangChainResponse(
    conversation.trainingSetId,
    userMessage.text,
    conversation.trainingSet.prompt,
    conversation.messages.map(m => `${m.sender.name}: ${m.text}`),
    mode
  )
  const newMessage: MessageWithRelations = {
    id: "",
    conversationId: conversation.id,
    text: response,
    createdAt: new Date(),
    sender: bot,
    conversation,
    participantId: bot.id,
    publicChatInstance: null,
    publicChatInstanceId: null,
  }
  const result = await storeUserMessage(conversation, newMessage);
  return NextResponse.json(result);
}

async function storeUserMessage(conversation: (Conversation & {
  participants: Participant[];
}), payload: MessageWithRelations, session?: Session) {
  invariant(payload.conversationId)
  const participant = conversation?.participants.find(p => p.name === session?.user.name || p.name === "Bot");
  const message = await prisma.message.create({
    data: {
      conversation: {
        connect: {
          id: payload.conversationId,
        }
      },
      sender: {
        connect: {
          id: participant?.id
        }
      },
      text: payload.text,
    },
    select: {
      id: true,
      text: true,
      createdAt: true,
      sender: true,
      participantId: true,
      conversationId: true,
      conversation: true,
    }
  });
  return message;
}
