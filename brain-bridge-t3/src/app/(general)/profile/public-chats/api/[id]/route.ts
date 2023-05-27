import { type NextRequest, NextResponse } from "next/server";
import invariant from "tiny-invariant";
import { type PublicChatWithRelations } from "~/interfaces/types";
import { getServerSession } from "~/server/auth";
import ServerData from "~/server/data";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const payload = await req.json() as PublicChatWithRelations;
  const session = await getServerSession();
  invariant(session, "User must be logged in to update public chats");
  const result = await ServerData.updatePublicChat(payload);
  return NextResponse.json(result);
}