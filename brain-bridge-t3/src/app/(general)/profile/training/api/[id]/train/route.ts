import { NextResponse, type NextRequest } from "next/server";
import invariant from "tiny-invariant";
import { createTrainingIndex } from "~/lib/training/training";
import { getServerSession } from "~/server/auth";
import ServerData from "~/server/data";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const session = await getServerSession();
  invariant(session, "User must be logged in to train a training set")
  const set = await ServerData.fetchUserTrainingSet(id);
  invariant(set, "Training set must exist")
  const result = await createTrainingIndex({ name: set.name, trainingSet: set });
  const trainingIndex = await ServerData.createTrainingIndex({ ...result, trainingSet: set });
  return NextResponse.json(trainingIndex)
}