import React, { useMemo } from "react";
import {
  MdChat,
  MdConstruction,
  MdPublic,
  MdQuestionMark,
} from "react-icons/md";
import { type TrainingSetWithRelations } from "~/data/interfaces/types";
import DashboardCard from "./DashboardCard";
import Popover from "./Popover";

function Dashboard({ trainingSet }: { trainingSet: TrainingSetWithRelations }) {
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
        <div className="rounded-lg border-dashed border-gray-200 dark:border-gray-700">
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <DashboardCard
              amount={
                trainingSet.conversations.filter((c) => {
                  const TenDaysAgo = new Date(
                    new Date().getTime() - 10 * 24 * 60 * 60 * 1000
                  );
                  if (c.updatedAt > TenDaysAgo) return true;
                }).length
              }
              icon={<MdChat />}
              title="Active"
              popover={{
                title: "Active Conversations",
                content:
                  "Number of active private conversations that have been updated in the last 10 days.",
              }}
            />
            <DashboardCard
              amount={trainingSet.publicChats.length}
              icon={<MdPublic />}
              title="Public Chats"
              popover={{
                title: "Public Chats",
                content:
                  "Number of public chats that have been created for this training set.",
              }}
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
              popover={{
                title: "Unanswered Missed Questions",
                content:
                  "Number of queries from the user that the languange model scored an answer confidence of less than 80%, which have not yet been answered by a human.",
              }}
            />
            <DashboardCard
              amount={trainingSet.missedQuestions.length}
              icon={<MdQuestionMark />}
              title="Total Questions"
              popover={{
                title: "Total Missed Questions",
                content:
                  "Number of queries from the user that the languange model scored an answer confidence of less than 80%",
              }}
            />
            <DashboardCard
              title="Active Public"
              amount={trainingSet.publicChats
                .filter((p) => {
                  const TenDaysAgo = new Date(
                    new Date().getTime() - 10 * 24 * 60 * 60 * 1000
                  );
                  if (p.updatedAt > TenDaysAgo) return true;
                })
                .reduce((acc, curr) => curr.publicChatInstance.length + acc, 0)}
              icon={<MdPublic color="lightgreen" />}
              popover={{
                title: "Active Public",
                content: "Active Public Chats in the last 10 days",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Dashboard);
