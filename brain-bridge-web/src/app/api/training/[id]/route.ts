/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type TrainingSetWithRelations } from "~/data/interfaces/types";
import { type NextRequest, NextResponse } from "next/server";
import invariant from "tiny-invariant";
import { prisma } from "~/server/db";
import ServerData from "~/server/server-data";
import { getServerSession } from "~/server/auth";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const existing = await prisma.trainingSet.findUnique({
    where: {
      id,
    }
  });
  const session = await getServerSession();
  invariant(session, "Session must exist to update")
  invariant(existing, "Training set must exist to update")
  const payload = (await request.json()) as TrainingSetWithRelations;
  
  await ServerData.updateUserTrainingSet(payload);

  const trainingSet = await ServerData.fetchUserTrainingSet(id);

  const response = new NextResponse(JSON.stringify(trainingSet), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  await prisma.trainingSet.delete({
    where: {
      id,
    },
  })

  const response = new NextResponse(null, { status: 204 });

  return response;
}