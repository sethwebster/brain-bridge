import { type Session } from "next-auth";
import React, { useMemo } from "react";
import { type TrainingSetWithRelations } from "@/data/interfaces/types";
import TrainingSetListItem from "./TrainingSetListItem";

function TrainingSetList({
  sets,
  session,
}: {
  sets: TrainingSetWithRelations[];
  session: Session;
}) {
  const sorted = useMemo(() => {
    return sets.sort((a, b) => a.name.localeCompare(b.name));
  }, [sets]);
  return (
    <ul>
      {sorted.map((set) => (
        <TrainingSetListItem set={set} session={session} key={set.id} />
      ))}
    </ul>
  );
}

export default React.memo(TrainingSetList);
