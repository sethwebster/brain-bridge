"use client";

import { type TrainingSet } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NewButton from "@/app/components/NewButton";
import Select from "@/app/components/Select";
import DataClient from "@/utils/data-client";

export function NewChatButton({
  trainingSets,
}: {
  user: { email?: string | null | undefined; name?: string | null | undefined };
  trainingSets?: TrainingSet[];
}) {
  const router = useRouter();
  const [selectedTrainingSet, setSelectedTrainingSet] = useState<string>(
    trainingSets?.[0]?.id || ""
  );
  const handleNewChat = async () => {
    const newChat = await DataClient.newChat(selectedTrainingSet);
    router.push(`/profile/chat/${newChat.id}`);
    router.refresh();
  };

  const handleTrainingSetChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedTrainingSet(event.target.value);
  };
  return (
    <div>
      <Select
        className="relative p-2 mr-2 rounded-md -top-1.5"
        onChange={handleTrainingSetChange}
      >
        {trainingSets?.map((trainingSet) => (
          <option key={trainingSet.id} value={trainingSet.id}>
            {trainingSet.name}
          </option>
        ))}
      </Select>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <NewButton onClick={handleNewChat} ariaLabel="Create a new chat" />
    </div>
  );
}
