import { NextRequest, NextResponse } from "next/server";
import invariant from "tiny-invariant";
import R2 from "~/lib/R2";
import { getServerSession } from "~/server/auth";

export async function GET(req: NextRequest, { params }: { params: { slug: string[] } }) {
  const session = await getServerSession();
  invariant(session, "User must be logged in to retrieve a file")
  const { slug } = params;
  const key = [session?.user.id, ...slug].join("/")
  const url = await R2.getSignedUrlForRetrieval(key);
  const data = await fetch(url).then(r => r.blob());
  return new Response(data);
}