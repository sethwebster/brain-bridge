import { type NextRequest, NextResponse } from "next/server";
import ServerData from "~/server/server-data";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const conversation = await ServerData.clearPublicChat(params.id);
  return NextResponse.json(conversation, { status: 200 });
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const conversation = await ServerData.fetchChat(params.id);
  return NextResponse.json({ messages: conversation.messages });
}