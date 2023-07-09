"use client";
import { useEffect, useState } from "react";
import { type Socket } from "socket.io-client";

type TrainingStages =
  | "overall"
  | "sources-load"
  | "source-load"
  | "split-documents"
  | "vectorize";

interface ProgressPayload {
  stage: TrainingStages;
  statusText: string;
  progress: number;
  additionalInfo?: string;
}

type ProgressReport = Record<TrainingStages, ProgressPayload>;

const StatusToLabelMap: Record<TrainingStages, string> = {
  overall: "Overall Progress",
  "sources-load": "Loading Sources",
  "source-load": "Loading Source",
  "split-documents": "Splitting Documents",
  vectorize: "Vectorizing",
};
export function TrainingProgressDisplay({
  socket,
  onMessage,
  isTraining: _isTraining,
}: {
  socket: Socket | undefined | null;
  onMessage: <T>(message: string, callback: (data: T) => void) => () => void;
  isTraining: boolean;
}) {
  const [status, setStatus] = useState<
    Record<
      TrainingStages,
      {
        stage: TrainingStages;
        statusText: string;
        progress: number;
        additionalInfo?: string;
      }
    >
  >({
    overall: {
      stage: "overall",
      statusText: "Waiting for data...",
      progress: 0,
    },
    "sources-load": {
      stage: "sources-load",
      statusText: "Waiting for data...",
      progress: 0,
    },
    "source-load": {
      stage: "source-load",
      statusText: "Waiting for data...Waiting for data...Waiting for data...Waiting for data...Waiting for data...Waiting for data...Waiting for data...Waiting for data...Waiting for data...Waiting for data...",
      progress: 0,
    },
    "split-documents": {
      stage: "split-documents",
      statusText: "Waiting for data...",
      progress: 0,
    },
    vectorize: {
      stage: "vectorize",
      statusText: "Waiting for data...",
      progress: 0,
    },
  });

  useEffect(() => {
    if (socket) {
      const removeOnMessage = onMessage(
        "training-progress",
        (payload: ProgressReport) => {
          setStatus(payload);
        }
      );

      return () => {
        removeOnMessage();
      };
    }
  }, [onMessage, socket]);

  return (
    <div className={`max-w-sm overflow-hidden transition-all duration-500 `}>
      <h3 className="text-xl">Training Progress</h3>
      {/* <pre>{JSON.stringify(status, null, 2)}</pre> */}
      {Object.entries(status).map(([stage, { statusText, progress }]) => (
        <div
          key={stage}
          className={`${stage === "split-documents" ? "hidden" : ""}`}
        >
          <p className="text-sm">{StatusToLabelMap[stage as TrainingStages]}</p>
          <div className="h-5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
            <div
              className="h-5 rounded-full bg-green-300 shadow-sm transition-all "
              style={{ width: `${Math.min(100, Math.round(progress * 100))}%` }}
            ></div>
            <div className="relative -top-5 m-auto  flex h-5 flex-col justify-center truncate rounded-lg text-center ">
              <div className="w-auto truncate text-xs text-slate-100 mix-blend-difference px-2">
                {statusText}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
