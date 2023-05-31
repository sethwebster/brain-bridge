/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type TrainingSetWithRelations } from "~/server/interfaces/types";
import { type NextRequest, NextResponse } from "next/server";
import invariant from "tiny-invariant";
import { prisma } from "~/server/db";
import ServerData from "~/server/server-data";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const existing = await prisma.trainingSet.findUnique({
    where: {
      id,
    }
  });
  invariant(existing, "Training set must exist to update")
  const payload = (await request.json()) as TrainingSetWithRelations;
  const data = await prisma.trainingSet.update({
    where: {
      id,
    },
    data: {
      name: payload.name,
      prompt: payload.prompt,
      questionsAndAnswers: {
        deleteMany: {},
        create: payload.questionsAndAnswers.map(qa => {
          return {
            question: qa.question,
            answer: qa.answer,
            token: qa.token,
          }
        })
      },
      trainingSources: {
        deleteMany: {},
        create: payload.trainingSources.map(s => {
          return {
            type: s.type,
            name: s.name,
            content: s.content,
            pending: false,
          }
        }),
      },
      missedQuestions: {
        deleteMany: {},
        create: payload.missedQuestions.map(qa => {
          return {
            question: qa.question,
            llmAnswer: qa.llmAnswer,
            correctAnswer: qa.correctAnswer,
          }
        })
      },
      updatedAt: new Date(),
      version: existing.version + 1,
    },
  })

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