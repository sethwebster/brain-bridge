import { type PublicChatInstance } from "@prisma/client";
import { useMemo } from "react";
import { type TrainingSetWithRelations } from "~/data/interfaces/types";

export default function Dashboard({
  trainingSet,
}: {
  trainingSet: TrainingSetWithRelations;
}) {
  const missedQuestionsCount = useMemo(
    () =>
      trainingSet.missedQuestions.filter(
        (q) => !q.ignored || !q.correctAnswer || q.correctAnswer?.length === 0
      ).length,
    [trainingSet.missedQuestions]
  );

  return (
    <>
      <div className="p-4">
        <div className="rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
          <div className="mb-4 grid grid-cols-3 gap-4">
            <div className="flex h-24 items-center justify-center rounded bg-green-400 shadow dark:bg-gray-800">
              <div className="flex flex-col text-center text-2xl text-gray-50 dark:text-gray-500">
                <div>{trainingSet.conversations.length}</div>
                <small>🔒 Active Conversations</small>
              </div>
            </div>
            <div className="flex h-24 items-center justify-center rounded bg-green-400 shadow dark:bg-gray-800">
              <div className="flex flex-col text-center text-2xl text-gray-50 dark:text-gray-500">
                <div>{(trainingSet.publicChats || []).length}</div>
                <small>📢 Public Chats</small>
              </div>
            </div>
            <div
              className={`flex h-24 items-center justify-center rounded ${
                missedQuestionsCount === 0
                  ? "bg-green-400"
                  : missedQuestionsCount <= 3
                  ? "bg-amber-400"
                  : "bg-red-400"
              } shadow dark:bg-gray-800`}
            >
              <div className="flex flex-col text-center text-2xl text-gray-50 dark:text-gray-500">
                <div>{missedQuestionsCount}</div>
                <small>🚧 Unanswered Missed Questions</small>
              </div>
            </div>
            <div className="flex h-24 items-center justify-center rounded bg-green-400 shadow dark:bg-gray-800">
              <div className="flex flex-col text-center text-2xl text-gray-50 dark:text-gray-500">
                <div>
                  {trainingSet.publicChats.reduce(
                    (acc, curr) =>
                      (
                        curr as unknown as {
                          publicChatInstance: PublicChatInstance[];
                        }
                      ).publicChatInstance.length + acc,
                    0
                  )}
                </div>
                <small>Active Public Conversations</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
