"use client";
import { NewButton } from "@/app/(general)/components/NewButton";
import Select from "@/app/components/Select";
import Data from "@/utils/data";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function NewChatButton({
  user,
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
    const newChat = await Data.newChat(user, selectedTrainingSet);
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
      <NewButton onClick={handleNewChat} />
    </div>
  );
}
