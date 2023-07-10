import { PrismaClient, TrainingSet } from "@prisma/client";
import invariant from "tiny-invariant";
import { Server, Socket } from "socket.io";
import Mutex from "../../lib/mutex.ts";
import { getRoomId } from "./roomsHandler.ts";
import { BuildResult, ProgressPayload, TrainingSetBuilder } from "../../lib/training.ts";
import ServerData from "../../lib/server-data.ts";
import debounce from "lodash.debounce";

export type TrainingStages = "overall" |
  "sources-load" |
  "source-load" |
  "source-error" |
  "split-documents" |
  "vectorize";


type ProgressReport = Record<
  TrainingStages, ProgressPayload
>

interface TrainingSetPayload {
  id: string
}

interface TrainingApiStatus {
  inProgress: Record<string, ProgressReport>;
}

const trainingApiStatus: TrainingApiStatus = {
  inProgress: {}
}

export function trainingSetRoomName(id: string) {
  return getRoomId(`training-${id}`);
}
const DEFAULT_PROGRESS_REPORT: Record<
  TrainingStages, ProgressPayload
> = {
  overall: {
    stage: "overall",
    statusText: "Waiting for data...",
    valueType: "percentage",
    value: 0,
  },
  "sources-load": {
    stage: "sources-load",
    statusText: "Waiting for data...",
    valueType: "percentage",
    value: 0,
  },
  "source-load": {
    stage: "source-load",
    statusText:
      "Waiting for data...",
    valueType: "percentage",
    value: 0,
  },
  "source-error": {
    stage: "source-error",
    statusText: "No errors found",
    valueType: "value",
    value: 0,
  },
  "split-documents": {
    stage: "split-documents",
    statusText: "Waiting for data...",
    valueType: "percentage",
    value: 0,
  },
  vectorize: {
    stage: "vectorize",
    statusText: "Waiting for data...",
    valueType: "percentage",
    value: 0,
  },
}

const mutex = new Mutex();

async function updateApiStatus(id: string, progress: ProgressReport | undefined) {
  await mutex.run(async () => {
    if (progress) {
      trainingApiStatus.inProgress[id] = progress;
    } else {
      delete trainingApiStatus.inProgress[id];
    }
  })
}

export function trainingHandler(socket: Socket, io: Server) {

  socket.on("join-training-room", async (payload: { data: { room: string } }) => {
    const { room } = (payload.data);
    console.log("join-training-room", trainingSetRoomName(room))
    invariant(room, "room (as id) is required");
    await socket.join(trainingSetRoomName(room));
    console.log((await io.in(trainingSetRoomName(room)).fetchSockets()).length, "listeners");
  });

  socket.on("leave-training-room", async (payload: { data: { room: string } }) => {
    const { room } = (payload.data);
    console.log("leave-training-room", trainingSetRoomName(room))
    invariant(room, "room (as id) is required");
    await socket.leave(trainingSetRoomName(room));
    console.log((await io.in(trainingSetRoomName(room)).fetchSockets()).length, "listeners");
  });

  async function isTraining(id: string) {
    const is = await mutex.run(async () => {
      const is = trainingApiStatus.inProgress[id];
      return is;
    })
    return is;
  }

  async function addTraining(id: string) {
    await mutex.run(async () => {
      trainingApiStatus.inProgress[id] = { ...DEFAULT_PROGRESS_REPORT };
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
    const emit = debounce((message: string, data: any) => io.in(roomName).emit(message, data), 20);
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

    const user = await ServerData.fetchUserById(set?.userId);
    invariant(user, "User not found");
    const settings = user.userSettings[0];
    invariant(settings, "User settings not found");
    invariant(settings.openAIApiKey, "OpenAI API Key not found");

    emit("training-started", { id });

    function progressNotifiier(payload: ProgressPayload) {
      const progressState = { ...trainingApiStatus.inProgress[id] };
      progressState[payload.stage] = { ...progressState[payload.stage], ...payload }
      updateApiStatus(id, progressState).then(() => {
        emit("training-progress", progressState);
      });
    }

    try {
      const options = { ...{ maxSegmentLength: 2000, overlapBetweenSegments: 200 }, ...((set.trainingOptions as object) ?? {}) }
      const builder = new TrainingSetBuilder(
        {
          openAIApiKey: settings.openAIApiKey,
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
          type: "TOKEN",
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
      throw error;
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
