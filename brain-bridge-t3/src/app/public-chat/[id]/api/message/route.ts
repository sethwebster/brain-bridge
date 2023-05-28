import { type Message } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";
import invariant from "tiny-invariant";
import { getLLMResponseDirect } from "~/app/(general)/profile/chat/[id]/api/message/route";
import { MessageWithRelations, messageWithRelations, publicChatInstanceWithRelations } from "~/interfaces/types";
import ServerData from "~/server/data";
import { prisma } from "~/server/db";


export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const payload = await req.json() as MessageWithRelations;
  const { participantId, publicChatInstance, text } = payload;
  console.log("PAYLOAD", payload)
  const chat = await ServerData.fetchPublicChat(id);

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
  const response = await getLLMResponseDirect(instance.id, text, chat.trainingSetId, instance.messages);

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