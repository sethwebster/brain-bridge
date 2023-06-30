import React, {  } from "react";
import Chat from "../../chat/components/Chat";
import invariant from "tiny-invariant";
import { type Session } from "next-auth";
import { type ConversationWithRelations } from "~/data/interfaces/types";

interface ChatTabProps {
  trainingSetId: string;
  selectedChat: ConversationWithRelations | undefined;
  session: Session;
}

function ChatTab({ selectedChat, session }: ChatTabProps) {
  invariant(session, "Session must be defined");
  invariant(selectedChat, "Selected chat must be defined");
  invariant(session, "Session must be defined");
  return (
    <div className="h-auto">
      <Chat selectedChat={selectedChat} session={session} />
    </div>
  );
}

export default React.memo(ChatTab);
