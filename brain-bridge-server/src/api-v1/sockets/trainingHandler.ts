import { PrismaClient, TrainingIndex } from "@prisma/client";
import invariant from "tiny-invariant";
import { ProgressNotifier, createTrainingIndex } from "../../lib/training";
import { verifyJWT } from "../../lib/jwt";

export function trainingHandler(socket) {
  socket.on("train", async (data) => {
    const { data: { trainingSetId: id }, token } = data;
    invariant(id, "trainingSetId is required");
    const verifiedToken = verifyJWT(token);
    if (!verifiedToken) {
      console.log("Invalid token");
      socket.emit("training-error", { error: "Invalid token" });
      return;
    }

    const prisma = new PrismaClient();
    const set = await prisma.trainingSet.findUnique({
      where: { id: id }, include: {
        conversations: true,
        trainingSources: true,
        questionsAndAnswers: true,
        missedQuestions: true,
      }
    });

    console.log("set", set);
    if (!set) {
      socket.emit("training-error", { error: "Training set not found" });
      return;
    }

    socket.emit("training-started", data);

    function progressNotifiier(progress) {
      console.log("CALLED")
      socket.emit("training-progress", progress);
    }

    try {
      const result = await createTrainingIndex({ name: set.name, trainingSet: set, onProgress: progressNotifiier }) as Partial<TrainingIndex>;
      delete result.vectors;
      delete result.docStore;
      socket.emit("training-complete", result);
    } catch (error: any) {
      console.log("ERROR", error);
      socket.emit("training-error", { error });
    }
  });
}
