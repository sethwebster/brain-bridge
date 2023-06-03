import { PrismaClient } from "@prisma/client";
import { Socket } from "socket.io";
import invariant from "tiny-invariant";
import { createTrainingIndex } from "../lib/training";

export function messageRouter(socket: Socket) {

  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  socket.on("train", async (data) => {
    const { trainingSetId: id } = data;
    const prisma = new PrismaClient();
    const set = await prisma.trainingSet.findUnique({
      where: { id: id }, include: {
        conversations: true,
        trainingSources: true,
        questionsAndAnswers: true,
        missedQuestions: true,
      }
    });
    if (!set) {
      socket.emit("training-error", { error: "Training set not found" });
      return;
    }
    socket.emit("training-started", data);
    try {
      const result = await createTrainingIndex({ name: set.name, trainingSet: set });
      delete result.vectors
      delete result.docStore
      socket.emit("training-complete", result);
    } catch (error: any) {
      console.log("ERROR", error)
      socket.emit("training-error", { error });
    }
  })

  socket.on("hello", (data) => {
    console.log("hello received", data);
  });

  socket.on("message", (data) => {
    console.log("message received", data);
    socket.emit("message", "message received");
  })
}
