import { type NextRequest, NextResponse } from "next/server";
import invariant from "tiny-invariant";
import R2 from "~/lib/R2";
import { getServerSession } from "~/server/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  invariant(session, "User must be logged in to upload a file")
  const payload = (await req.json()) as { fileNameKey: string };
  const { fileNameKey } = payload;
  const finalKey = `${session.user.id}/${fileNameKey}`;
  const url = await R2.getSignedUrlForUpload(finalKey);
  return NextResponse.json({ url });
}