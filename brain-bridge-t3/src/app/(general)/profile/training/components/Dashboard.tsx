import React, { useMemo } from "react";
import {
  MdChat,
  MdConstruction,
  MdPublic,
  MdQuestionMark,
} from "react-icons/md";
import { type TrainingSetWithRelations } from "~/data/interfaces/types";
import DashboardCard from "./DashboardCard";

function Dashboard({
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
              amount={trainingSet.publicChats.reduce(
                (acc, curr) => curr.publicChatInstance.length + acc,
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

export default React.memo(Dashboard)