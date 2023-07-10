import { type Session } from "next-auth";
import { type TrainingSetWithRelations } from "@/data/interfaces/types";
import { DeleteTrainingSet } from "../DeleteTrainingSet";
import Link from "next/link";
import { MdShare } from "react-icons/md";
import React from "react";

function TrainingSetListItem({ set, session }: { set: TrainingSetWithRelations; session: Session; }) {
  return (
    <li
      key={set.id}
      className="flex justify-between border-b border-b-slate-300 p-2 dark:border-b-slate-500"
    >
      <Link
        href={`/profile/training/${set.id}/details`}
        className="flex flex-row text-blue-400"
      >
        {set.userId !== session.user.id && (
          <div
            className="mr-2 flex flex-col justify-center"
            title="This training set is shared with you"
          >
            <div className="p-1">
              <MdShare />
            </div>
          </div>
        )}
        <div className="flex flex-col justify-center">
          {set.name || `<unnamed>`}
        </div>
      </Link>
      <DeleteTrainingSet id={set.id} user={session.user} />
    </li>
  );
}

export default React.memo(TrainingSetListItem)