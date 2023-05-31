"use client";
import { Session } from "next-auth";
import PublicChatItem from "./PublicChatItem";
import { NewButton } from "@/app/(general)/components/NewButton";
import { useCallback, useState } from "react";
import EditPublicChat from "./EditPublicChat";
import Data from "@/utils/data";
import { useRouter } from "next/navigation";
import InfoBox from "@/app/components/InfoBox";

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
    <div className="w-full h-full p-4 border-2 border-gray-700  rounded-lg">
      <InfoBox
        title="Public Chats"
        body="Public chats expose your chat bot to an external link so that people can chat without signing up for an account on Brain Bridge."
        dismissable={true}
        dismissableId={"info-box-public-chats"}
      />
      <header className="flex justify-between pb-2 border-b border-gray-600 ">
        <h1 className="text-2xl">Public Chats</h1>
        <NewButton onClick={() => setAddItem(!addItem)} />
      </header>
      <div className="grid w-full grid-cols-8 gap-4 text-sm text-center text-slate-500 dark:text-gray-300">
        <div className="border-b"></div>
        <div className="col-span-3 border-b">Name</div>
        <div className="col-span-2 border-b">ID</div>
        <div className="text-center border-b">Published</div>
        <div className="border-b"></div>
      </div>
      <ul>
        {(publicChats || []).map((chat) => (
          <li key={chat.id} className="p-1">
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
