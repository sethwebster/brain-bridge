"use client";
import React, { useCallback, useState } from "react";
import { type TrainingSetWithRelations } from "@/data/interfaces/types";
import { type TrainingSetFormProps, TrainingSetForm } from "./TrainingSetForm";

function TrainingSetPage(props: TrainingSetFormProps) {
  const { trainingSet, onUpdate } = props;
  const [trainingSetData, setTrainingSetData] = useState(trainingSet);

  const handleUpdate = useCallback(
    (set: TrainingSetWithRelations) => {
      setTrainingSetData(set);
      if (onUpdate) onUpdate(set);
    },
    [onUpdate]
  );

  return (
    <TrainingSetForm
      {...props}
      trainingSet={trainingSetData}
      key={trainingSetData.trainingIndexVersion}
      onUpdate={handleUpdate}
    />
  );
}

export default React.memo(TrainingSetPage);
