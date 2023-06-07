import { type PublicChatInstance } from "@prisma/client";
import { useMemo } from "react";
import { type TrainingSetWithRelations } from "~/server/interfaces/types";

export default function Dashboard({
  trainingSet,
}: {
  trainingSet: TrainingSetWithRelations;
}) {

  const missedQuestionsCount = useMemo(() => trainingSet.missedQuestions.filter(
    (q) =>
      !q.ignored ||
      !q.correctAnswer ||
      q.correctAnswer?.length === 0
  ).length, [trainingSet.missedQuestions]);

  return (
    <>
      <div className="p-4">
        <div className="rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
          <div className="mb-4 grid grid-cols-3 gap-4">
            <div className="flex h-24 items-center justify-center rounded bg-green-400 shadow dark:bg-gray-800">
              <p className="flex flex-col text-center text-2xl text-gray-50 dark:text-gray-500">
                <div>{trainingSet.conversations.length}</div>
                <small>🔒 Active Conversations</small>
              </p>
            </div>
            <div className="flex h-24 items-center justify-center rounded bg-green-400 shadow dark:bg-gray-800">
              <p className="flex flex-col text-center text-2xl text-gray-50 dark:text-gray-500">
                <div>{(trainingSet.publicChats || []).length}</div>
                <small>📢 Public Chats</small>
              </p>
            </div>
            <div className={`flex h-24 items-center justify-center rounded ${missedQuestionsCount === 0 ? "bg-green-400" : missedQuestionsCount <= 3 ? "bg-amber-400" : "bg-red-400"} shadow dark:bg-gray-800`}>
              <p className="flex flex-col text-center text-2xl text-gray-50 dark:text-gray-500">
                <div>
                  {missedQuestionsCount}
                </div>
                <small>🚧 Unanswered Missed Questions</small>
              </p>
            </div>
            <div className="flex h-24 items-center justify-center rounded bg-green-400 shadow dark:bg-gray-800">
              <p className="flex flex-col text-center text-2xl text-gray-50 dark:text-gray-500">
                <div>
                  {trainingSet.publicChats.reduce(
                    (acc, curr) =>
                      (curr as unknown as { publicChatInstance: PublicChatInstance[] })
                        .publicChatInstance.length + acc,
                    0
                  )}
                </div>
                <small>Active Public Conversations</small>
              </p>
            </div>
          </div>
          <div className="mb-4 flex h-48 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="flex h-28 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex h-28 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex h-28 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex h-28 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
          </div>
          <div className="mb-4 flex h-48 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex h-28 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex h-28 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex h-28 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex h-28 items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
