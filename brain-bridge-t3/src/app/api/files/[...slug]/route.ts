import { type NextRequest } from "next/server";
import invariant from "tiny-invariant";
import R2 from "~/lib/R2";
import Logger from "~/lib/logger";
import { getServerSession } from "~/server/auth";
import ServerData from "~/server/server-data";

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
    const shared = req.nextUrl.searchParams.get("shared")
    let userId = session.user.id;
    if (shared) {
      const set = req.nextUrl.searchParams.get("set")
      invariant(set, "set is required");
      const trainingSet = await ServerData.fetchUserTrainingSet(set);
      invariant(trainingSet, "trainingSet not found");
      if (trainingSet.userId !== session.user.id) {
        invariant(trainingSet.trainingSetShares, "trainingSetShares not found");
        const share = trainingSet.trainingSetShares.find(s => s.userId === session.user.id);
        invariant(share, "share not found");
        userId = trainingSet.userId;
      }
    }
    const key = [userId, ...slug].join("/")
    console.log("key", key)
    const url = await R2.getSignedUrlForRetrieval(key);
    console.log("url", url)
    const data = await fetch(url).then(r => r.blob());
    return new Response(data);
  }
}