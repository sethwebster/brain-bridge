import { type PublicChat } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";
import invariant from "tiny-invariant";
import { getServerSession } from "~/server/auth";
import { prisma } from "~/server/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  invariant(session, "User must be logged in to create public chats");
  const payload = await req.json() as PublicChat;
  console.log("payload", payload);
  const chat = await prisma.publicChat.create({
    data: {
      name: payload.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      trainingSet: {
        connect: {
          id: payload.trainingSetId,
        }
      },
      user: {
        connect: {
          id: session.user.id,
        }
      }
    }
  });
  const response = new NextResponse(JSON.stringify(chat), { status: 201 });
  return response;

}