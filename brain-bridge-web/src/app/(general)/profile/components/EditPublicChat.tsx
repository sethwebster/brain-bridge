"use client";

import { useCallback, useState } from "react";
import { type PublicChatWithRelations } from "~/data/interfaces/types";
import Input from "~/app/components/Input";
import { SaveIcon } from "~/app/components/SvgIcons";

export default function EditPublicChat({
  publicChat,
  onSave,
}: {
  publicChat: PublicChatWithRelations;
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

  const handleSave = useCallback(() => {
    if (editedPublicChat.name.trim().length > 0) {
      onSave(editedPublicChat);
    }
  }, [editedPublicChat, onSave]);

  return (
    <div className="flex w-full flex-row p-2">
      <div className="flex flex-grow flex-row">
        <Input
          type="text"
          placeholder="Name your public chat"
          value={editedPublicChat.name}
          className="mr-2 flex-1 rounded-md border p-2"
          onChange={handleNameChange}
        />
      </div>
      <button
        className="rounded-md bg-green-200 p-1 px-3 shadow hover:bg-green-400"
        onClick={handleSave}
      >
        <SaveIcon />
      </button>
    </div>
  );
}
