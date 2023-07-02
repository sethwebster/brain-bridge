"use client";

import { type Session } from "next-auth";
import { useCallback, useState } from "react";
import EditPublicChat from "./EditPublicChat";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  type PublicChatWithRelations,
} from "~/data/interfaces/types";
import DataClient from "~/utils/data-client";
import { PencilIcon, TrashCan } from "~/app/components/SvgIcons";
import Modal from "~/app/components/ModalDialog";
import { toast } from "react-toastify";
import ConfirmButton from "~/base-components/ConfirmButton";

export default function PublicChatItem({
  publicChat,
  session: _session,
}: {
  publicChat: PublicChatWithRelations;
  session: Session;
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

  const handlePublishUnPublish = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (publicChat.published) {
        await DataClient.unpublishPublicChat(publicChat);
      } else {
        await DataClient.publishPublicChat(publicChat);
      }
      router.refresh();
    },
    [publicChat, router]
  );

  const url = `/public-chat/${publicChat.id}`;

  const handleDeleteChatConfirmed = useCallback(async () => {
    await DataClient.deletePublicChat(publicChat.id);
    router.refresh();
  }, [publicChat.id, router]);

  const handleDeleteChat = useCallback(() => {
    if (publicChat.published) {
      setDeleteModalShown(true);
    } else {
      void handleDeleteChatConfirmed();
    }
  }, [handleDeleteChatConfirmed, publicChat.published]);

  const handleDeleteModalClosed = useCallback(() => {
    setDeleteModalShown(false);
  }, []);

  const handleItemClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!publicChat.published) {
        toast.error("Chat is not published.");
        e.preventDefault();
      }
    },
    [publicChat.published]
  );

  if (editing)
    return (
      <EditPublicChat
        publicChat={publicChat}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSave={handleSave}
      />
    );

  return (
    <>
      <Link href={url} onClick={handleItemClick}>
        <div className="w-full rounded-md bg-slate-300 p-2 shadow-md dark:bg-slate-500">
          <div className="flex flex-row justify-between">
            <h1>{publicChat.name}</h1>
            <button
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={handlePublishUnPublish}
              className={`text-sm ${
                publicChat.published ? "text-green-500" : "text-red-500"
              }`}
            >
              {publicChat.published ? "⬤" : "⬤"}
            </button>
          </div>
          <small className="col-span-2 truncate opacity-70">
            {publicChat.trainingSet.name}
          </small>
          <div className="flex justify-end">
            <ConfirmButton
              className="rounded-md bg-blue-400 p-2"
              confirmingClassName="rounded-md bg-red-400 p-2"
              onConfirmed={handleDeleteChat}
            >
              <TrashCan />
            </ConfirmButton>
            <button
              className="ml-2 rounded-md bg-blue-100 p-1.5 shadow hover:bg-blue-200"
              onClick={handleEditClicked}
            >
              <PencilIcon />
            </button>
          </div>
        </div>
      </Link>
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
