import { PrismaClient, TrainingSet } from "@prisma/client";
import invariant from "tiny-invariant";
import { createTrainingIndex } from "../../lib/training";
import { verifyJWT } from "../../lib/jwt";
import { Server, Socket } from "socket.io";
import Mutex from "../../lib/mutex";

type TrainingStages = "overall" |
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
  return `training-room-${id}`;
}

const mutex = new Mutex();

export function trainingHandler(socket: Socket, io: Server) {

  socket.on("join-training", async (data: { payload: TrainingSetPayload }) => {
    const { payload: { id } } = data;
    invariant(id, "id is required");
    await socket.join(trainingSetRoomName(id));
    console.log((await io.in(trainingSetRoomName(id)).fetchSockets()).length, "listeners");
  });

  socket.on("leave-training", async (data: { payload: TrainingSetPayload }) => {
    const { payload: { id } } = data;
    invariant(id, "id is required");
    await socket.leave(trainingSetRoomName(id));
    console.log((await io.in(trainingSetRoomName(id)).fetchSockets()).length, "listeners");
  });

  async function isTraining(id: string) {
    await mutex.lock();
    const is = trainingApiStatus.inProgress[id];
    mutex.unlock();
    return is;
  }

  async function addTraining(id: string) {
    await mutex.lock();
    trainingApiStatus.inProgress[id] = true;
    mutex.unlock();
  }

  async function removeTraining(id: string) {
    await mutex.lock();
    delete trainingApiStatus.inProgress[id];
    mutex.unlock();
  }

  async function doTraining(id: string, token) {
    const roomName = trainingSetRoomName(id);
    const emit = (message: string, data: any) => io.in(roomName).emit(message, data);
    invariant(id, "trainingSetId is required");
    const verifiedToken = verifyJWT(token);
    if (!verifiedToken) {
      console.log("Invalid token");
      emit("training-error", { error: "Invalid token" });
      removeTraining(id);
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

    function progressNotifiier(progress: ProgressPayload) {
      progressState[progress.stage] = progress;
      emit("training-progress", progressState);
    }

    try {
      const options = { ...{ maxSegmentLength: 2000, overlapBetweenSegments: 200 }, ...((set.trainingOptions as object) ?? {}) }
      await createTrainingIndex({ name: set.name, trainingSet: set, onProgress: progressNotifiier, options }) as Partial<TrainingSet>;
      await prisma.trainingSet.update({
        where: { id: set.id },
        data: { trainingStatus: "IDLE", trainingIndexVersion: set.version }
      });
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
      await addTraining(data.trainingSetId);
      await doTraining(id, token);
    } catch (e) {
      console.log("ERROR", e);
      socket.emit("training-error", { error: e });
    } finally {
      await removeTraining(id);
    }

  });
}
