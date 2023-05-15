"use client";
import { NewButton } from "@/app/components/NewButton";
import Data from "@/utils/data";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function NewChatButton({
  user,
  trainingSets
}: {
  user: { email?: string | null | undefined; name?: string | null | undefined };
  trainingSets?: TrainingSet[];
}) {
  const router = useRouter();
  const [selectedTrainingSet, setSelectedTrainingSet] = useState<string>(
    trainingSets?.[0]?.id || ""
  );
  const handleNewChat = async () => {
    const newChat = await Data.newChat(user, selectedTrainingSet);
    router.push(`/profile/chat/${newChat.id}`);
  };

  
  const handleTrainingSetChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedTrainingSet(event.target.value);
  };
  return (
    <div>
      <select
        className="relative p-2 mr-2 rounded-md -top-1.5"
        onChange={handleTrainingSetChange}
      >
        {trainingSets?.map((trainingSet) => (
          <option key={trainingSet.id} value={trainingSet.id}>
            {trainingSet.name}
          </option>
        ))}
      </select>
      <NewButton onClick={handleNewChat} />
    </div>
  );
}
