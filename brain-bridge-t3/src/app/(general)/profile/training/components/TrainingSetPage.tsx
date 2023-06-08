"use client";
import { useCallback, useState } from "react";
import { type TrainingSetWithRelations } from "~/server/interfaces/types";
import { type TrainingSetFormProps, TrainingSetForm } from "./TrainingSetForm";


export default function TrainingSetPage(props: TrainingSetFormProps) {
  const { trainingSet, onUpdate } = props;
  const [trainingSetData, setTrainingSetData] = useState(trainingSet);

  const handleUpdate = useCallback(
    (set: TrainingSetWithRelations) => {
      setTrainingSetData(set);
      if (onUpdate)
        onUpdate(set);
    },
    [onUpdate]
  );

  return (
    <TrainingSetForm
      {...props}
      trainingSet={trainingSetData}
      onUpdate={handleUpdate} />
  );
}
