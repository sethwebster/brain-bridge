import React, { useEffect, useState } from "react";
import Chat from "../../chat/components/Chat";
import invariant from "tiny-invariant";
import { type Session } from "next-auth";
import DataClient from "~/utils/data-client";
import Logger from "~/lib/logger";
import { type Conversation } from "@prisma/client";
import { type ConversationWithRelations } from "~/data/interfaces/types";

interface ChatTabProps {
  trainingSetId: string;
  selectedChat: Conversation | undefined;
  session: Session;
}

function ChatTab({
  selectedChat,
  session,
  trainingSetId,
}: ChatTabProps) {
  const [fullSelectedChat, setFullSelectedChat] = useState<
    ConversationWithRelations | undefined
  >(undefined);

  useEffect(() => {
    const fetchConversation = async () => {
      if (!selectedChat) {
        const conversation = await DataClient.newChat(trainingSetId);
        setFullSelectedChat(conversation);
      } else {
        const conversation = await DataClient.fetchChat(selectedChat.id);
        setFullSelectedChat(conversation);
      }
    };

    if (!fullSelectedChat) {
      fetchConversation().catch((e) => {
        Logger.error(e);
      });
    }

    // if (!fullSelectedChat?.messages) {
    //   fetchMessages().catch((e) => {
    //     Logger.error(e);
    //   });
    // }
  }, [fullSelectedChat, selectedChat, trainingSetId]);
  if (!fullSelectedChat || !fullSelectedChat.messages) {
    return <div></div>;
  }
  invariant(session, "Session must be defined");
  return (
    <div className="h-auto">
      <Chat selectedChat={fullSelectedChat} session={session} />
    </div>
  );
}

export default React.memo(ChatTab);
