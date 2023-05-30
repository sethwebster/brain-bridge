import { NextResponse, type NextRequest } from "next/server";
import invariant from "tiny-invariant";
import { env } from "~/env.mjs";
import { getServerSession } from "~/server/auth";
import ServerData from "~/server/data";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const session = await getServerSession();
  invariant(session, "User must be logged in to train a training set")
  const set = await ServerData.fetchUserTrainingSet(id);
  invariant(set, "Training set must exist")
  // const result = await createTrainingIndex({ name: set.name, trainingSet: set });
  const result = await fetch(`${env.API_ENDPOINT}/train/${id}`, {
    method: "POST"
  })
  
  return NextResponse.json({result})
}