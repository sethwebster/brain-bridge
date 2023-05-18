"use client";

import { useCallback, useState } from "react";
import { SaveIcon } from "../../training/new/components/svg-icons";
import invariant from "tiny-invariant";

export default function EditPublicChat({
  publicChat,
  trainingSets,
  onSave,
}: {
  publicChat: PublicChat;
  trainingSets: TrainingSet[];
  onSave: (publicChat: PublicChat) => void;
}) {
  const [editedPublicChat, setEditedPublicChat] =
    useState<PublicChat>(publicChat);

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditedPublicChat({
        ...editedPublicChat,
        name: event.target.value,
      });
    },
    [editedPublicChat]
  );

  const handleTrainingSetChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newTrainingSet = trainingSets.find(
        (set) => set.id === event.target.value
      );
      invariant(newTrainingSet, "Training set not found");
      setEditedPublicChat({
        ...editedPublicChat,
        trainingSet: newTrainingSet,
      });
    },
    [editedPublicChat, trainingSets]
  );

  const handleSave = useCallback(() => {
    onSave(editedPublicChat);
  }, [editedPublicChat, onSave]);

  return (
    <div className="flex flex-row w-full p-2">
      <div className="flex flex-row flex-grow">
        <input
          type="text"
          value={editedPublicChat.name}
          className="flex-1 p-2 mr-2 border rounded-md"
          onChange={handleNameChange}
        />
        <select
          className="mr-2 border rounded-md flex-3"
          onChange={handleTrainingSetChange}
          value={editedPublicChat.trainingSet.id}
        >
          {trainingSets.map((set) => (
            <option key={set.id} value={set.id}>
              {set.name}
            </option>
          ))}
        </select>
      </div>
      <button
        className="p-1 px-3 bg-green-200 rounded-md shadow hover:bg-green-400"
        onClick={handleSave}
      >
        <SaveIcon />
      </button>
    </div>
  );
}
