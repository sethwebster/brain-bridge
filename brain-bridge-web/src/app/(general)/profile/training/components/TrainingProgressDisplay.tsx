"use client";
import { useEffect, useMemo, useState } from "react";
import { type Socket } from "socket.io-client";
import { twMerge } from "tailwind-merge";

export type TrainingStages =
  | "overall"
  | "sources-load"
  | "source-load"
  | "source-error"
  | "split-documents"
  | "vectorize";

interface ProgressPayload {
  stage: TrainingStages;
  statusText: string;
  value: number;
  valueType: "value" | "percentage";
  additionalInfo?: string;
  error?: boolean;
  errorData?: object;
}

export type ProgressReport = Record<TrainingStages, ProgressPayload>;

const StatusToLabelMap: Record<TrainingStages, string> = {
  overall: "Overall Progress",
  "sources-load": "Loading Sources",
  "source-load": "Loading Source",
  "split-documents": "Splitting Documents",
  "source-error": "Source Errors",
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
  const [status, setStatus] = useState<Record<TrainingStages, ProgressPayload>>(
    {
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
  );

  const errors = useMemo(() => {
    return Object.values(status).filter(({ statusText }) =>
      statusText.startsWith("Error")
    );
  }, [status]);

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
      {errors.length > 0 && <p>{errors.length}</p>}
      {Object.entries(status).map(
        ([stage, { statusText, value, valueType }]) => (
          <div
            key={stage}
            className={twMerge(
              `${stage === "split-documents" ? "hidden" : ""}`
            )}
          >
            <p className="text-sm">
              {StatusToLabelMap[stage as TrainingStages]}
            </p>
            {valueType === "percentage" && (
              <div className="h-5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                <div
                  className={twMerge(
                    "h-5 rounded-full bg-green-300 shadow-sm transition-all ",
                    stage === "source-error" ? "bg-red-300" : ""
                  )}
                  style={{
                    width: `${Math.min(100, Math.round(value * 100))}%`,
                  }}
                ></div>
                <div className="relative -top-5 m-auto  flex h-5 flex-col justify-center truncate rounded-lg text-center ">
                  <div className="w-auto truncate px-2 text-xs text-slate-100 mix-blend-difference">
                    {statusText}
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}
