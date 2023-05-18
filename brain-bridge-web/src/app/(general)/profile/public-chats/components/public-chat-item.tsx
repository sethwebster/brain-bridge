"use client";

import { Session } from "next-auth";
import { DeleteTrainingSet } from "../../training/DeleteTrainingSet";
import { PencilIcon } from "../../training/new/components/svg-icons";
import { useCallback, useState } from "react";
import EditPublicChat from "./edit-public-chat";
import Data from "@/utils/data";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PublicChatItem({
  publicChat,
  session,
  trainingSets,
}: {
  publicChat: PublicChat;
  session: Session;
  trainingSets: TrainingSet[];
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const handleEditClicked = useCallback(() => {
    setEditing(true);
  }, []);

  const handleSave = useCallback(
    async (publicChat: PublicChat) => {
      const response = await Data.updateUserPublicChat(
        publicChat,
        session.user as { email: string }
      );
      if (response.success) {
        router.refresh();
        setEditing(false);
      }
    },
    [router, session.user]
  );

  const handlePublishUnPublish = useCallback(async () => {
    if (publicChat.published) {
      await Data.unPublishUserPublicChat(publicChat, session.user as any);
    } else {
      await Data.publishUserPublicChat(publicChat, session.user as any);
    }
    router.refresh();
  }, [publicChat, router, session.user]);

  const url = `/public-chat/${publicChat.id}`;

  if (editing)
    return (
      <EditPublicChat
        publicChat={publicChat}
        trainingSets={trainingSets}
        onSave={handleSave}
      />
    );
  return (
    <div className="flex flex-row justify-between p-2">
      <div className="flex flex-row flex-grow">
        <button
          className="p-1.5 mr-2 bg-blue-100 hover:bg-blue-200 shadow rounded-md"
          onClick={handleEditClicked}
        >
          <PencilIcon />
        </button>
        <div className="flex flex-row flex-grow justify-evenly">
          <div>{publicChat.name}</div>
          <div>
            <Link href={url} className="text-blue-300">
              {publicChat.id}
            </Link>
          </div>
          <button onClick={handlePublishUnPublish}>
            {publicChat.published ? "Published" : "Not published"}
          </button>
        </div>
      </div>
      <DeleteTrainingSet id={publicChat.id} user={session.user as any} />
    </div>
  );
}
