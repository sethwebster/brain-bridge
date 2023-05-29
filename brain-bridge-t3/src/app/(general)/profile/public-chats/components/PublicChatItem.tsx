"use client";

import { type Session } from "next-auth";
import { PencilIcon } from "../../training/components/SvgIcons";
import { useCallback, useState } from "react";
import EditPublicChat from "./EditPublicChat";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  type PublicChatWithRelations,
  type TrainingSetWithRelations,
} from "~/interfaces/types";
import DataClient from "~/utils/data-client";
import DeleteButton from "../../components/DeleteButton";
import { TrashCan } from "~/app/components/SvgIcons";

export default function PublicChatItem({
  publicChat,
  session: _session,
  trainingSets,
}: {
  publicChat: PublicChatWithRelations;
  session: Session;
  trainingSets: TrainingSetWithRelations[];
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const handleEditClicked = useCallback(() => {
    setEditing(true);
  }, []);

  const handleSave = useCallback(
    async (publicChat: PublicChatWithRelations) => {
      await DataClient.updatePublicChat(publicChat);
      router.refresh();
      setEditing(false);
    },
    [router]
  );

  const handlePublishUnPublish = useCallback(async () => {
    if (publicChat.published) {
      await DataClient.unpublishPublicChat(publicChat);
    } else {
      await DataClient.publishPublicChat(publicChat);
    }
    router.refresh();
  }, [publicChat, router]);

  const url = `/public-chat/${publicChat.id}`;

  const handleDeleteChatConfirmed = useCallback(async () => {
    await DataClient.deletePublicChat(publicChat.id);
    router.refresh();
  }, [publicChat.id, router]);

  if (editing)
    return (
      <EditPublicChat
        publicChat={publicChat}
        trainingSets={trainingSets}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSave={handleSave}
      />
    );
  return (
    <>
      <div className="grid w-full grid-cols-8 gap-4">
        <div>
          <button
            className="rounded-md bg-blue-100 p-1.5 shadow hover:bg-blue-200"
            onClick={handleEditClicked}
          >
            <PencilIcon />
          </button>
        </div>
        <div className="col-span-3 truncate">{publicChat.name}</div>
        <div className="col-span-2">
          <Link href={url} className="text-blue-300">
            {publicChat.id}
          </Link>
        </div>
        <button
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handlePublishUnPublish}
          className={`text-sm ${
            publicChat.published ? "text-green-500" : "text-red-500"
          }`}
        >
          {publicChat.published ? "⬤" : "⬤"}
        </button>
        <div className="flex justify-end">
          <DeleteButton
            className="rounded-md bg-blue-400 p-2"
            confirmingClassName="rounded-md bg-red-400 p-2"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onConfirmed={handleDeleteChatConfirmed}
          >
            <TrashCan />
          </DeleteButton>
        </div>
      </div>
    </>
  );
}
