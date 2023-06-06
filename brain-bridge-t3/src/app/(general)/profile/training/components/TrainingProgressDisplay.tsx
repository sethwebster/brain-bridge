"use client";
import { startTransition, useEffect, useRef, useState } from "react";
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
        stage: TrainingStages;
        statusText: string;
        progress: number;
        additionalInfo?: string;
      }
    >
  >({
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
      stage: "vectorize",
      statusText: "Waiting to start",
      progress: 0,
    },
  });

  useEffect(() => {
    if (socket) {
      const removeOnMessage = onMessage(
        "training-progress",
        (payload: {
          stage: TrainingStages;
          statusText: string;
          progress: number;
          additionalInfo?: string;
        }) => {
          console.log(payload.stage, payload.progress)
          setStatus((s) => ({
            ...s,
            [payload.stage]: payload,
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
      <pre>{JSON.stringify(status, null, 2)}</pre>
      {Object.entries(status).map(([stage, { statusText, progress }]) => (
        <div key={stage}>
          <p>{StatusToLabelMap[stage as TrainingStages]}</p>
          <div className="h-5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-5 rounded-full bg-green-300 transition-all "
              style={{ width: `${Math.round(progress * 100)}%` }}
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
