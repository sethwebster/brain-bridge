"use client";
import { type PublicChat } from "@prisma/client";
import { type Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import InfoBox from "~/app/components/InfoBox";
import { NewButton } from "~/app/components/NewButton";
import {
  type PublicChatWithRelations,
  type TrainingSetWithRelations,
} from "~/data/interfaces/types";
import PublicChatItem from "./PublicChatItem";
import EditPublicChat from "./EditPublicChat";
import DataClient from "~/utils/data-client";
import Button from "~/base-components/Button";
import ContentBoxWithHeading from "./ContentBoxWithHeading";

interface PublicChatsListProps {
  publicChats: PublicChatWithRelations[];
  session: Session;
  trainingSet: TrainingSetWithRelations;
}

export default function PublicChatsList({
  publicChats,
  session,
  trainingSet,
}: PublicChatsListProps) {
  const [addItem, setAddItem] = useState(false);
  const router = useRouter();

  const handleSave = useCallback(
    async (publicChat: PublicChat) => {
      const newChat = await DataClient.createPublicChat(publicChat);
      if (newChat) {
        router.refresh();
        setAddItem(false);
      }
    },
    [router]
  );

  return (
    <>
      <ContentBoxWithHeading
        heading={
          <div className="flex w-full flex-row justify-between">
            <h1 className="text-xl">Public Chats</h1>
            <NewButton onClick={() => setAddItem(!addItem)} />
          </div>
        }
      >
        {publicChats.length === 0 && (
          <InfoBox type="info" title="Public Chats">
            <>
              <p>
                Public chats expose your chat bot to an external link so that
                people can chat without signing up for an account on Brain
                Bridge.
              </p>

              <Button
                label="Get Started"
                className="mx-auto mt-4 max-w-sm"
                onClick={() => setAddItem(true)}
              />
            </>
          </InfoBox>
        )}

        <>
          <ul>
            {(publicChats || []).map((chat) => (
              <li key={chat.id} className="p-1">
                <PublicChatItem publicChat={chat} session={session} />
              </li>
            ))}
            {addItem && (
              <li>
                <EditPublicChat
                  publicChat={{
                    id: "",
                    name: "",
                    trainingSet,
                    published: false,
                    userId: session.user.id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    trainingSetId: trainingSet.id,
                  }}
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onSave={handleSave}
                />
              </li>
            )}
          </ul>
        </>
      </ContentBoxWithHeading>
    </>
  );
}
