import { type NextRequest } from "next/server";
import invariant from "tiny-invariant";
import R2 from "~/lib/R2";
import Logger from "~/lib/logger";
import { getServerSession } from "~/server/auth";

export async function GET(req: NextRequest, { params }: { params: { slug: string[] } }) {
  const session = await getServerSession();
  invariant(session, "User must be logged in to retrieve a file")
  const { slug } = params;
  if (slug.join() === "web") {
    const url = req.nextUrl.searchParams.get("url")
    Logger.info("fetching", url)
    invariant(url, "url is required");
    const data = await fetch(url).then(r => r.blob());
    return new Response(data);
  } else {
    const key = [session?.user.id, ...slug].join("/")
    const url = await R2.getSignedUrlForRetrieval(key);
    const data = await fetch(url).then(r => r.blob());
    return new Response(data);
  }
}