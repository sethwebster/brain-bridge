import { type NextRequest } from "next/server";
import invariant from "tiny-invariant";
import R2 from "~/lib/R2";
import Logger from "~/lib/logger";
import { getServerSession } from "~/server/auth";
import ServerData from "~/server/server-data";

// This file handles requests for training set resources

export async function GET(req: NextRequest, { params }: { params: { slug: string[] } }) {
  const session = await getServerSession();
  invariant(session, "User must be logged in to retrieve a file")
  const { slug } = params;
  console.log(
    "fetching file",
    slug
  )
  if (slug.join() === "web") {
    const url = req.nextUrl.searchParams.get("url")
    Logger.info("fetching", url)
    invariant(url, "url is required");
    const data = await fetch(url).then(r => r.blob());
    return new Response(data);
  } else {
    const [setId] = slug;
    invariant(setId, "setId is required");
    const trainingSet = await ServerData.fetchUserTrainingSet(setId);
    invariant(trainingSet, "trainingSet not found");
    const shared = trainingSet?.trainingSetShares?.find(s => s.userId === session.user.id);
    let userId = session.user.id;
    if (shared) {
      userId = trainingSet.userId;
    }
    const key = [userId, ...slug].join("/")
    console.log("key", key)
    const url = await R2.getSignedUrlForRetrieval(key);
    console.log("url", url)
    const data = await fetch(url).then(r => r.blob());
    return new Response(data);
  }
}