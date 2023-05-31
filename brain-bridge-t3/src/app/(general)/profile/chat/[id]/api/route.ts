import { NextResponse, type NextRequest } from "next/server";
import ServerData from "~/server/server-data";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await ServerData.deleteChat(params.id);
  return new NextResponse(null, { status: 204 })
}