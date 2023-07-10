import { type NextRequest } from "next/server";
import invariant from "tiny-invariant";
import R2 from "@/lib/R2";
import Logger from "@/lib/logger";
import { getServerSession } from "@/server/auth";
import ServerData from "@/server/server-data";

// This file handles requests for training set resources

export async function GET(req: NextRequest, { params }: { params: { slug: string[] } }) {
  const session = await getServerSession();
  invariant(session, "User must be logged in to retrieve a file")
  const { slug } = params;
  Logger.info(
    "File retrieval request",
    slug
  )
  if (slug.join() === "web") {
    const url = req.nextUrl.searchParams.get("url")
    Logger.info("fetching url", url)
    invariant(url, "url is required");
    const data = await fetch(url).then(r => r.blob());
    return new Response(data);
  } else {
    const [setId] = slug;
    invariant(setId, "setId is required");
    const trainingSet = await ServerData.fetchUserTrainingSet(setId);
    invariant(trainingSet, "trainingSet not found");
    const shared = trainingSet?.trainingSetShares?.find(s => s.acceptedUserId === session.user.id);
    let userId = session.user.id;
    if (shared) {
      Logger.info("user is accessing a shared training set")
      userId = trainingSet.userId;
    }
    const key = [userId, ...slug].join("/")
    const url = await R2.getSignedUrlForRetrieval(key);
    const data = await fetch(url).then(r => r.blob());
    return new Response(data);
  }
}