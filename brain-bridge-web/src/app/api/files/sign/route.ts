import { type NextRequest, NextResponse } from "next/server";
import invariant from "tiny-invariant";
import R2 from "~/lib/R2";
import { getServerSession } from "~/server/auth";
import ServerData from "~/server/server-data";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  invariant(session, "User must be logged in to upload a file")
  const payload = (await req.json()) as { fileNameKey: string, trainingSetId: string };
  const { fileNameKey, trainingSetId } = payload;
  const trainingSet = await ServerData.fetchUserTrainingSet(trainingSetId);
  invariant(trainingSet, "trainingSet not found");
  if (session.user.id !== trainingSet.userId) {
    const shared = trainingSet?.trainingSetShares?.find(s => s.userId === session.user.id);
    invariant(shared, "User must own training set or have a share to upload a file")
  }
  const finalKey = `${trainingSet.userId}/${fileNameKey}`;
  const url = await R2.getSignedUrlForUpload(finalKey);
  return NextResponse.json({ url });
}