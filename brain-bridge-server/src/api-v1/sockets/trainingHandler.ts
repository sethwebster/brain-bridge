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
      where: { id: id },
      include: {
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

    if (set.trainingStatus === "TRAINING") {
      socket.emit("training-error", { error: "Training already in progress" });
      return;
    }

    await prisma.trainingSet.update({
      where: { id: set.id },
      data: { trainingStatus: "TRAINING" }
    });

    socket.emit("training-started", data);

    function progressNotifiier(progress) {
      socket.emit("training-progress", progress);
    }



    try {
      const options = { ...{ maxSegmentLength: 2000, overlapBetweenSegments: 200 }, ...((set.trainingOptions as object) ?? {}) }
      console.log("USED OPTIONS", options)
      await createTrainingIndex({ name: set.name, trainingSet: set, onProgress: progressNotifiier, options }) as Partial<TrainingIndex>;
      await prisma.trainingSet.update({
        where: { id: set.id },
        data: { trainingStatus: "IDLE" }
      });
      socket.emit("training-complete", { trainingSetId: set.id });
    } catch (error: any) {
      console.log("ERROR", error);
      socket.emit("training-error", { error });
      await prisma.trainingSet.update({
        where: { id: set.id },
        data: { trainingStatus: "ERROR" }
      });
    }
  });
}
