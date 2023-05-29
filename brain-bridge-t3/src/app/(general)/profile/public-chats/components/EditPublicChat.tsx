"use client";

import { useCallback, useState } from "react";
import { SaveIcon } from "../../training/components/SvgIcons";
import invariant from "tiny-invariant";
import { type PublicChatWithRelations } from "~/interfaces/types";
import Input from "~/app/components/Input";
import Select from "~/app/components/Select";
import { type TrainingSet } from "@prisma/client";

export default function EditPublicChat({
  publicChat,
  trainingSets,
  onSave,
}: {
  publicChat: PublicChatWithRelations;
  trainingSets: TrainingSet[];
  onSave: (publicChat: PublicChatWithRelations) => void;
}) {
  const [editedPublicChat, setEditedPublicChat] =
    useState<PublicChatWithRelations>(publicChat);

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
        <Input
          type="text"
          value={editedPublicChat.name}
          className="flex-1 p-2 mr-2 border rounded-md"
          onChange={handleNameChange}
        />
        <Select
          className="mr-2 border rounded-md flex-3"
          onChange={handleTrainingSetChange}
          value={editedPublicChat.trainingSet.id}
        >
          {trainingSets.map((set) => (
            <option key={set.id} value={set.id}>
              {set.name}
            </option>
          ))}
        </Select>
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
