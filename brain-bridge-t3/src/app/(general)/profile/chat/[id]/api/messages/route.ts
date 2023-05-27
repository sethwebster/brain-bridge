import { type NextRequest, NextResponse } from "next/server";
import ServerData from "~/server/data";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const conversation = await ServerData.clearChat(params.id);
  return NextResponse.json(conversation);
}