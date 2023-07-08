import { NextResponse, type NextRequest } from "next/server";
import invariant from "tiny-invariant";
import { getServerSession } from "~/server/auth";
import ServerData from "~/server/server-data";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  invariant(session, "User must be logged in to create a chat")
  const payload = await req.json() as { trainingSetId: string }
  const { trainingSetId } = payload;
  const chat = await ServerData.newChat(trainingSetId);
  return NextResponse.json(chat)
}