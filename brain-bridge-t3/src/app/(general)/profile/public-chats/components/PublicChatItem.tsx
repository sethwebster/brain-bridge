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
} from "~/server/interfaces/types";
import DataClient from "~/utils/data-client";
import DeleteButton from "../../components/DeleteButton";
import { TrashCan } from "~/app/components/SvgIcons";
import Modal from "~/app/components/ModalDialog";

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
  const [deleteModalShown, setDeleteModalShown] = useState(false);

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

  const handleDeleteChat = useCallback(() => {
    if (publicChat.published) {
      setDeleteModalShown(true);
    } else {
      void handleDeleteChatConfirmed()
    }
  }, [handleDeleteChatConfirmed, publicChat.published]);

  const handleDeleteModalClosed = useCallback(() => {
    setDeleteModalShown(false);
  }, []);

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
      <div className="grid w-full grid-cols-10 gap-4">
        <div>
          <button
            className="rounded-md bg-blue-100 p-1.5 shadow hover:bg-blue-200"
            onClick={handleEditClicked}
          >
            <PencilIcon />
          </button>
        </div>
        <div className="col-span-3 truncate">{publicChat.name}</div>
        <div className="col-span-2 truncate">{publicChat.trainingSet.name}</div>
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
            className="p-2 bg-blue-400 rounded-md"
            confirmingClassName="rounded-md bg-red-400 p-2"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onConfirmed={handleDeleteChat}
          >
            <TrashCan />
          </DeleteButton>
        </div>
      </div>
      <Modal
        title="Delete Published Chat"
        confirmText="Delete"
        closeText="Cancel"
        show={deleteModalShown}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onConfirm={handleDeleteChatConfirmed}
        onCancel={handleDeleteModalClosed}
      >
        <p className="text-slate-700">
          Are you sure you want to delete this public chat? This action cannot
          be undone. Any links to this chat will result in a page not found, and
          all user conversations and messages will be lost.
        </p>
      </Modal>
    </>
  );
}
