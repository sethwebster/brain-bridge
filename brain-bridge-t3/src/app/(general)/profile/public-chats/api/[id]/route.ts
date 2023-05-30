import { type NextRequest, NextResponse } from "next/server";
import invariant from "tiny-invariant";
import { type PublicChatWithRelations } from "~/server/interfaces/types";
import { getServerSession } from "~/server/auth";
import ServerData from "~/server/data";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  await ServerData.deletePublicChat(id);
  return NextResponse.json(null, { status: 204 });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const payload = await req.json() as PublicChatWithRelations;
  const session = await getServerSession();
  invariant(session, "User must be logged in to update public chats");
  const result = await ServerData.updatePublicChat({ ...payload, id: params.id });
  return NextResponse.json(result);
}