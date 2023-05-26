"use client";

import { useCallback, useEffect, useRef } from "react";
import NewMessageBox from "./NewMessageBox";
import { ChatToolbar } from "./ChatToolbar";
import { type User } from "@prisma/client";
import { Messages } from "../(general)/profile/chat/components/Messages";
import {
  FakeSpeakerIndicator,
  FakeTypingIndicator,
} from "../(general)/profile/chat/components/FakeTypingIndicator";
import {
  type ConversationWithRelations,
  type MessageWithRelations,
} from "~/interfaces/types";

interface ChatProps {
  viewer: User;
  conversation: ConversationWithRelations;
  // currentMessageText: string;
  answerPending: boolean;
  soundPending: boolean;
  soundEnabled: boolean;
  onNewMessage: (newMessage: MessageWithRelations) => void;
  onSoundEnabledChange: (soundEnabled: boolean) => void;
}

export default function ChatDisplay({
  viewer,
  answerPending,
  soundPending,
  soundEnabled,
  onNewMessage,
  onSoundEnabledChange,
  conversation,
}: ChatProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSoundEnabledChange = useCallback(() => {
    onSoundEnabledChange(!soundEnabled);
  }, [onSoundEnabledChange, soundEnabled]);

  const handleNewMessage = useCallback(
    (message: string) => {
      onNewMessage({
        id: "",
        text: message,
        createdAt: new Date(),
        participantId: viewer.id,
        conversation,
        conversationId: conversation.id,
        sender: {
          id: viewer.id,
          name: viewer.name || "",
          conversationId: conversation.id,
          createdAt: new Date(),
          type: "HUMAN",
          updatedAt: new Date(),
        },
      });
    },
    [conversation, onNewMessage, viewer.id, viewer.name]
  );

  const handleTypingIndicatorShown = useCallback(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      // if (bottomRef.current?.checkVisibility()) return;
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [answerPending, soundPending]);

  return (
    <div className="flex flex-col w-full h-full mb-20 overflow-scroll bg-slate-100 dark:bg-slate-700">
      <ChatToolbar
        soundEnabled={soundEnabled}
        soundPending={soundPending}
        onSoundEnabledClick={handleSoundEnabledChange}
      />
      <div className="flex-grow w-full h-full">
        <div className="pt-6">
          <Messages messages={conversation.messages} userName={viewer.name || viewer.email || viewer.id} />
        </div>
        <div className="ml-4">
          <FakeTypingIndicator
            show={answerPending}
            onShown={handleTypingIndicatorShown}
          />
        </div>
        {soundPending && (
          <div className="ml-4">
            <FakeSpeakerIndicator />
          </div>
        )}
        <div ref={bottomRef} className="m-2" />
        <div className="h-20 opacity-0" />
      </div>
      <div className="fixed bottom-0 w-10/12 ml-4 sm:ml-3 sm:w-4/5 ">
        <div className="sticky bottom-0 flex w-full p-2 mt-4 bg-opacity-0 outline-none">
          <NewMessageBox onMessageSend={handleNewMessage} />
        </div>
      </div>
    </div>
  );
}
