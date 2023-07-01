import { type PublicChatInstance } from "@prisma/client";
import { useMemo } from "react";
import {
  MdChat,
  MdConstruction,
  MdPublic,
  MdQuestionMark,
} from "react-icons/md";
import { type TrainingSetWithRelations } from "~/data/interfaces/types";

function DashboardCard({
  amount,
  icon,
  title,
  className,
}: {
  amount: number;
  icon: React.ReactNode;
  title: string;
  className?: string;
}) {
  const resolvedClassName = className?.includes("bg-")
    ? className
    : (className ?? "") + " bg-white dark:bg-gray-800";
  return (
    <div
      className={`flex flex-col items-center justify-center space-y-2 rounded-lg  p-4 shadow  ${
        resolvedClassName ?? ""
      }`}
    >
      <div className="text-3xl text-gray-700 dark:text-gray-200">{amount}</div>
      <div className="flex flex-row items-center justify-center space-x-2 text-gray-500 dark:text-gray-200">
        {icon}
        <div className="text-sm">{title}</div>
      </div>
    </div>
  );
}

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
      <div className="mt-4">
        <div className="border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-3">
            <DashboardCard
              amount={trainingSet.conversations.length}
              icon={<MdChat />}
              title="Active"
            />
            <DashboardCard
              amount={trainingSet.publicChats.length}
              icon={<MdPublic />}
              title="Public Chats"
            />
            <DashboardCard
              amount={missedQuestionsCount}
              icon={<MdConstruction />}
              title="Unanswered"
              className={
                missedQuestionsCount === 0
                  ? "bg-green-400 text-slate-50 dark:bg-green-600"
                  : missedQuestionsCount <= 3
                  ? "bg-yellow-400"
                  : "bg-red-400"
              }
            />
            <DashboardCard
              amount={trainingSet.missedQuestions.length}
              icon={<MdQuestionMark />}
              title="Total Questions"
            />
            <DashboardCard
              title="Active Public"
              amount={(trainingSet.publicChats).reduce(
                (acc, curr) =>
                  (
                    curr as unknown as {
                      publicChatInstance: PublicChatInstance[];
                    }
                  ).publicChatInstance.length + acc,
                0
              )}
              icon={<MdPublic color="lightgreen" />}
            />
          </div>
        </div>
      </div>
    </>
  );
}
