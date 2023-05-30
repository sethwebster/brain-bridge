/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type TrainingSetWithRelations } from "~/server/interfaces/types";
import { type NextRequest, NextResponse } from "next/server";
import invariant from "tiny-invariant";
import { getServerSession } from "~/server/auth";
import ServerData from "~/server/data";

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  invariant(session, "User must be logged in to create training sets");
  const payload = await request.json();

  const trainingSet = payload as TrainingSetWithRelations;
  
  const result = await ServerData.createTrainingSet(trainingSet)
  const response = new NextResponse(JSON.stringify(result), { status: 201 });

  return response;
}