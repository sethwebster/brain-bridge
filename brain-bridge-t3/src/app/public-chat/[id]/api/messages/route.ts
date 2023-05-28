import { type NextRequest, NextResponse } from "next/server";
import ServerData from "~/server/data";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  await ServerData.clearPublicChat(id);
  return NextResponse.json({status:204})
}