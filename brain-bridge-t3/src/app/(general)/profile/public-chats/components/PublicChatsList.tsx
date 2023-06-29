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
import ContentBoxWithHeading from "../../components/ContentBoxWithHeading";
import { MdError, MdInfo, MdWarning } from "react-icons/md";

interface PublicChatsListProps {
  publicChats: PublicChatWithRelations[];
  session: Session;
  trainingSets: TrainingSetWithRelations[];
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
      const newChat = await DataClient.createPublicChat(publicChat);
      if (newChat) {
        router.refresh();
        setAddItem(false);
      }
    },
    [router]
  );
  const firstTrainingSet = trainingSets[0] || null;
  return (
    <>
      <ContentBoxWithHeading
        heading={
          <div className="flex flex-row justify-between w-full">
            <h1 className="text-xl">Public Chats</h1>
            <NewButton onClick={() => setAddItem(!addItem)} />
          </div>
        }
      >
        <InfoBox
          type="info"
          title="Public Chats"
          // dismissable={true}
          // dismissableId={"info-box-public-chats"}
        >
          <p>Public chats expose your chat bot to an external link so that people can chat without signing up for an account on Brain Bridge.</p>
          <p>To get started, click the create button above.</p>
        </InfoBox>

        {trainingSets.length === 0 && (
          <InfoBox
            type="warning"
            icon={<span className="sr-only">Info</span>}
            title="No Training Sets"
            body="!You will need to create a training set before you can create a public chat."
            dismissable={false}
          />
        )}
        {trainingSets.length > 0 && (
          <>
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
              {addItem && firstTrainingSet && (
                <li>
                  <EditPublicChat
                    publicChat={{
                      id: "",
                      name: "",
                      trainingSet: firstTrainingSet,
                      published: false,
                      userId: session.user.id,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                      trainingSetId: firstTrainingSet.id,
                    }}
                    trainingSets={trainingSets}
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onSave={handleSave}
                  />
                </li>
              )}
            </ul>
          </>
        )}
      </ContentBoxWithHeading>
    </>
  );
}
