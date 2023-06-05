"use client";
import { useEffect, useRef, useState } from "react";
import { type Socket } from "socket.io-client";

type TrainingStages = "overall" |
  "sources-load" |
  "source-load" |
  "split-documents" |
  "vectorize";
const StatusToLabelMap: Record<TrainingStages, string> = {
  overall: "Overall Progress",
  "sources-load": "Loading Sources",
  "source-load": "Loading Source",
  "split-documents": "Splitting Documents",
  vectorize: "Vectorizing",
};
export function TrainingProgressDisplay({
  socket, onMessage, isTraining,
}: {
  socket: Socket | undefined | null;
  onMessage: <T>(message: string, callback: (data: T) => void) => () => void;
  isTraining: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<
    Record<
      TrainingStages, {
        currentStage: TrainingStages;
        statusText: string;
        progress: number;
        additionalInfo?: string;
      }
    >
  >({
    overall: {
      currentStage: "overall",
      statusText: "Waiting to start",
      progress: 0,
    },
    "sources-load": {
      currentStage: "sources-load",
      statusText: "Waiting to start",
      progress: 0,
    },
    "source-load": {
      currentStage: "source-load",
      statusText: "Waiting to start",
      progress: 0,
    },
    "split-documents": {
      currentStage: "split-documents",
      statusText: "Waiting to start",
      progress: 0,
    },
    vectorize: {
      currentStage: "vectorize",
      statusText: "Waiting to start",
      progress: 0,
    },
  });

  useEffect(() => {
    if (socket) {
      const removeOnMessage = onMessage(
        "training-progress",
        (payload: {
          currentStage: TrainingStages;
          statusText: string;
          progress: number;
          additionalInfo?: string;
        }) => {
          setStatus((s) => ({
            ...s,
            [payload.currentStage]: payload,
          }));
        }
      );

      return () => {
        removeOnMessage();
      };
    }
  }, [onMessage, socket]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [status]);

  return (
    <div className={`overflow-hidden duration-1000 transition-all ${isTraining ? "h-auto opacity-90" : "h-0 opacity-0"}`}>
      <h3 className="text-xl">Training Progress</h3>
      {Object.entries(status).map(([stage, { statusText, progress }]) => (
        <div key={stage}>
          <p>{StatusToLabelMap[stage as TrainingStages]}</p>
          <div className="h-5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-5 rounded-full bg-green-300 "
              style={{ width: `${progress * 100}%` }}
            ></div>
            <div className="relative -top-6 mb-1 w-auto truncate text-center">
              <small>{statusText}</small>
            </div>
          </div>
        </div>
      ))}
      <div ref={ref} role="scoller"></div>
    </div>
  );
}
