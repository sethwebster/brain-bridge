import { Conversation, Participant } from "@prisma/client";
import invariant from "tiny-invariant";
import { prisma } from "../../lib/db";
import { MessageWithRelations, PublicChatInstanceWithRelations, messageWithRelations } from "./types";


export async function storeBotMessage(instance: PublicChatInstanceWithRelations, payload: MessageWithRelations) {
  const sender = instance.participants.find(p => p.type === "BOT");
  let responseMessage: MessageWithRelations;
  if (!sender) {
    responseMessage = await prisma.message.create({
      data: {
        text: payload.text,
        sender: {
          create: {
            type: "BOT",
            publicChatInstance: {
              connect: {
                id: instance.id,
              }
            },
            createdAt: new Date(),
          }
        },
        publicChatInstance: {
          connect: {
            id: instance.id,
          }
        },
        createdAt: new Date(),
      },
      ...messageWithRelations
    });
  } else {
    responseMessage = await prisma.message.create({
      data: {
        text: payload.text,
        sender: {
          connect: {
            id: sender.id,
          }
        },
        publicChatInstance: {
          connect: {
            id: instance.id,
          }
        },
        createdAt: new Date(),
      },
      ...messageWithRelations
    });
  }
  return responseMessage;
}

export async function storeUserMessage(conversation: (Conversation & {
  participants: Participant[];
}), payload: MessageWithRelations) {
  invariant(payload.conversationId);
  const participant = conversation?.participants.find(p => p.name === payload.sender.name);
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
