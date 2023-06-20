import { PrismaClient, TrainingSet } from "@prisma/client";
import invariant from "tiny-invariant";
import { Server, Socket } from "socket.io";
import Mutex from "../../lib/mutex.ts";
import { getRoomId } from "./roomsHandler.ts";
import { BuildResult, TrainingSetBuilder } from "../../lib/training.ts";

export type TrainingStages = "overall" |
  "sources-load" |
  "source-load" |
  "split-documents" |
  "vectorize";

interface ProgressPayload {
  stage: TrainingStages;
  statusText: string;
  progress: number;
  additionalInfo?: string;
}

type ProgressReport = Record<
  TrainingStages, ProgressPayload
>

interface TrainingSetPayload {
  id: string
}

interface TrainingApiStatus {
  inProgress: Record<string, boolean>;
}

const trainingApiStatus: TrainingApiStatus = {
  inProgress: {}
}

export function trainingSetRoomName(id: string) {
  return getRoomId(`training-${id}`);
}

const mutex = new Mutex();

setInterval(() => {
  // console.log("trainingApiStatus", trainingApiStatus);
}, 5000);

export function trainingHandler(socket: Socket, io: Server) {

  // socket.on("join-training", async (data: { payload: TrainingSetPayload }) => {
  //   const { payload: { id } } = data;
  //   invariant(id, "id is required");
  //   await socket.join(trainingSetRoomName(id));
  //   console.log((await io.in(trainingSetRoomName(id)).fetchSockets()).length, "listeners");
  // });

  // socket.on("leave-training", async (data: { payload: TrainingSetPayload }) => {
  //   const { payload: { id } } = data;
  //   invariant(id, "id is required");
  //   await socket.leave(trainingSetRoomName(id));
  //   console.log((await io.in(trainingSetRoomName(id)).fetchSockets()).length, "listeners");
  // });

  async function isTraining(id: string) {
    const is = await mutex.run(async () => {
      const is = trainingApiStatus.inProgress[id];
      return is;
    })
    return is;
  }

  async function addTraining(id: string) {
    await mutex.run(async () => {
      trainingApiStatus.inProgress[id] = true;
    })
  }

  async function removeTraining(id: string) {
    await mutex.run(async () => {
      delete trainingApiStatus.inProgress[id];
    });
  }

  async function doTraining(id: string, token: string) {
    const roomName = trainingSetRoomName(id);
    console.log("training started", id, roomName)
    const emit = (message: string, data: any) => io.in(roomName).emit(message, data);
    invariant(id, "trainingSetId is required");

    const prisma = new PrismaClient();
    const set = await prisma.trainingSet.findUnique({
      where: { id: id },
      include: {
        conversations: true,
        trainingSources: true,
        questionsAndAnswers: true,
        missedQuestions: true,
        usage: true
      }
    });

    if (!set) {
      emit("training-error", { error: "Training set not found" });
      return;
    }

    if (set.version === set.trainingIndexVersion) {
      emit("training-error", { error: "Training set is already up to date" });
      return;
    }

    emit("training-started", { id });

    const progressState: ProgressReport = {
      overall: {
        stage: "overall",
        statusText: "Waiting to start",
        progress: 0,
      },
      "sources-load": {
        stage: "sources-load",
        statusText: "Waiting to start",
        progress: 0,
      },
      "source-load": {
        stage: "source-load",
        statusText: "Waiting to start",
        progress: 0,
      },
      "split-documents": {
        stage: "split-documents",
        statusText: "Waiting to start",
        progress: 0,
      },
      vectorize: {
        progress: 0,
        stage: "vectorize",
        statusText: "Waiting to start",
      }
    }

    //(payload: ProgressPayload | ((stage: string, progress: ProgressPayload) => ProgressPayload)): void
    function progressNotifiier(payload: ProgressPayload) {
        progressState[payload.stage] = payload;
        emit("training-progress", progressState);
    }

    try {
      const options = { ...{ maxSegmentLength: 2000, overlapBetweenSegments: 200 }, ...((set.trainingOptions as object) ?? {}) }
      const builder = new TrainingSetBuilder(
        {
          trainingSet: set,
          onProgress: progressNotifiier,
          options,
          userId: (socket.decodedToken.sub as string)
        }
      );

      let buildResult: BuildResult = {
        tokensUsed: 0,
        cost: 0
      }
      const onTokensUsed = (buildResultEvent: BuildResult) => {
        buildResult = buildResultEvent;
      }

      await builder.build(onTokensUsed);
      await prisma.trainingSet.update({
        where: { id: set.id },
        data: { trainingStatus: "IDLE", trainingIndexVersion: set.version }
      });

      console.log("Build Result Costs", {
        tokens: buildResult.tokensUsed,
        cost: buildResult.tokensUsed * 0.0000004
      })

      await prisma.usage.create({
        data: {
          id: undefined,
          user: {
            connect: {
              id: socket.decodedToken.sub
            }
          },
          trainingSet: {
            connect: {
              id: set.id
            }
          },
          type: "COHERE_TOKEN",
          purpose: "EMBEDDING",
          count: buildResult.tokensUsed,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })

      emit("training-complete", { trainingSetId: set.id });
    } catch (error: any) {
      console.log("ERROR", error);
      emit("training-error", { error });
      const res = await prisma.trainingSet.update({
        where: { id: set.id },
        data: { trainingStatus: "ERROR" }
      });
      return res;
    }
  }

  socket.on("train", async (data) => {
    const { data: { trainingSetId: id }, token } = data;
    try {
      if (await isTraining(id)) {
        socket.emit("training-error", { error: "Training already in progress" });
        return;
      }
      await addTraining(id);
      await doTraining(id, token);

    } catch (e) {
      console.log("ERROR", e);
      socket.emit("training-error", { error: e });
    } finally {
      await removeTraining(id);
    }

  });
}
