"use client";
import { Session } from "next-auth";
import PublicChatItem from "./public-chat-item";
import { NewTrainingSetButton } from "../../training/NewTrainingSetButton";
import { NewButton } from "@/app/(general)/components/NewButton";
import { useCallback, useState } from "react";
import EditPublicChat from "./edit-public-chat";
import Data from "@/utils/data";
import { useRouter } from "next/navigation";

interface PublicChatsListProps {
  publicChats: PublicChat[];
  session: Session;
  trainingSets: TrainingSet[];
}

export default function PublicChatsList({
  publicChats,
  session,
  trainingSets,
}: PublicChatsListProps) {
  const [addItem, setAddItem] = useState(false);
  const router = useRouter();

  const handleSave = useCallback(
    async (publicChat: PublicChat) => {
      const newChat = await Data.createUserPublicChat(
        publicChat,
        session.user as { email: string }
      );
      if (newChat) {
        router.refresh();
        setAddItem(false);
      }
    },
    [router, session.user]
  );

  return (
    <div className="w-full h-full p-4 border-2 border-gray-700 border-dashed rounded-lg">
      <header className="flex justify-between pb-2 border-b border-gray-600 border-dashed">
        <h1 className="text-2xl">Public Chats</h1>
        <NewButton onClick={() => setAddItem(!addItem)} />
      </header>
      <ul>
        {(publicChats || []).map((chat, index) => (
          <li key={chat.id}>
            <PublicChatItem
              publicChat={chat}
              session={session}
              trainingSets={trainingSets}
            />
          </li>
        ))}
        {addItem && (
          <li>
            <EditPublicChat
              publicChat={{
                id: "",
                name: "",
                trainingSet: trainingSets[0],
                published: false,
                trainingSetPath: "",
              }}
              trainingSets={trainingSets}
              onSave={handleSave}
            />
          </li>
        )}
      </ul>
    </div>
  );
}
