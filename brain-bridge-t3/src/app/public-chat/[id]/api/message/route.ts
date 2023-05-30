import { NextResponse, type NextRequest } from "next/server";
import invariant from "tiny-invariant";
import { type MessageWithRelations, messageWithRelations, type ChatResponseMode } from "~/server/interfaces/types";
import { BrainBridgeLangChain } from "~/lib/llm";
import ServerData from "~/server/data";
import { prisma } from "~/server/db";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const payload = await req.json() as { message: MessageWithRelations, mode: ChatResponseMode };
  const { message: { participantId, publicChatInstance, text }, mode } = payload;
  const chat = await ServerData.fetchPublicChat(id, true);

  invariant(chat, "Chat not found");
  invariant(publicChatInstance, "Public chat instance not provided")
  invariant(publicChatInstance.id, "Public chat instance id not found --" + publicChatInstance.id);
  const instance = await ServerData.fetchPublicChatInstance(publicChatInstance.id);
  invariant(instance, "Public chat instance not found");
  // Store user message
  await prisma.message.create({
    data: {
      text,
      sender: {
        connect: {
          id: participantId,
        }
      },
      publicChatInstance: {
        connect: {
          id: instance.id,
        }
      },
      createdAt: new Date(),
    }
  });

  // Respond with bot message
  const llm = new BrainBridgeLangChain();
  const response = await llm.getLangChainResponse(chat.trainingSetId, text, chat.trainingSet.prompt, instance.messages.map(m => `${m.sender.name}: ${m.text}`), mode);
  const sender = instance.participants.find(p => p.type === "BOT");
  let responseMessage: MessageWithRelations;
  if (!sender) {
    responseMessage = await prisma.message.create({
      data: {
        text: response,
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
        text: response,
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

  return NextResponse.json(responseMessage);
}