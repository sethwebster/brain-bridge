"use client";

import { useCallback, useEffect, useRef } from "react";
import NewMessageBox from "./NewMessageBox";
import ChatToolbar from "./ChatToolbar";
import { type Participant } from "@prisma/client";
import {
  type ChatResponseMode,
  type MessageWithRelations,
} from "~/data/interfaces/types";
import { FakeSpeakerIndicator } from "../(general)/profile/components/TypingIndicator";
import Messages from "./Messages";

export interface Viewer {
  id: string;
  name?: string;
  email?: string;
}

export interface ConversationLike {
  id: string;
  messages: MessageWithRelations[];
  participants: Participant[];
}

export interface NewMessage {
  text: string;
  sender: Viewer;
}

interface ChatProps {
  viewer: Viewer;
  conversation: ConversationLike;
  // currentMessageText: string;
  answerPending: {pending: boolean; phase: ChatResponseMode};
  soundPending: boolean;
  soundEnabled: boolean;
  onNewMessage: (newMessage: NewMessage, mode: ChatResponseMode) => void;
  onSoundEnabledChange: (soundEnabled: boolean) => void;
  onClearChatClicked: () => void;
  notifyNewMessage: (callback: () => void) => void;
  isConnected: boolean;
  chatType: "private" | "public";
  chatResponseMode: ChatResponseMode;
  onChatResponseModeChanged: (mode: ChatResponseMode) => void;
}

export default function ChatDisplay({
  viewer,
  answerPending,
  soundPending,
  soundEnabled,
  conversation,
  onNewMessage,
  onSoundEnabledChange,
  onClearChatClicked,
  isConnected,
  chatType,
  chatResponseMode,
  onChatResponseModeChanged
}: ChatProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const handleSoundEnabledChange = useCallback(() => {
    onSoundEnabledChange(!soundEnabled);
  }, [onSoundEnabledChange, soundEnabled]);

  const handleClearChatClicked = useCallback(() => {
    onClearChatClicked();
  }, [onClearChatClicked]);

  const handleNewMessage = useCallback(
    (message: string) => {
      onNewMessage(
        {
          text: message,
          sender: viewer,
        },
        chatResponseMode
      );
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    },
    [chatResponseMode, onNewMessage, viewer]
  );

  const handleChatModeSelectionChanged = useCallback(
    (mode: ChatResponseMode) => {
      onChatResponseModeChanged(mode);
    },
    [onChatResponseModeChanged]
  );

  useEffect(() => {
    setTimeout(() => {
      // if (bottomRef.current?.checkVisibility()) return;
      // bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [answerPending, soundPending]);

  return (
    <div className="flex flex-col w-full h-full bg-slate-100 dark:bg-slate-600">
      <ChatToolbar
        chatMode={chatResponseMode}
        onModeSelectionChanged={handleChatModeSelectionChanged}
        soundEnabled={soundEnabled}
        soundPending={soundPending}
        onSoundEnabledClick={handleSoundEnabledChange}
        onClearChatClick={handleClearChatClicked}
      />
      <div className="flex-grow w-full h-full">
        <div className="pt-6 mb-14">
          <Messages
            messages={conversation.messages}
            userName={viewer.name || viewer.email || viewer.id}
            answerPending={answerPending}
          />
        </div>
        {soundPending && (
          <div className="ml-4">
            <FakeSpeakerIndicator />
          </div>
        )}
        <div
          className={`fixed bottom-0 ${
            chatType === "private"
              ? "w-[calc(100%-280px)] sm:w-[calc(100%-16em)]"
              : "w-full"
          }`}
        >
          <div className="p-2 px-4">
            <NewMessageBox
              onMessageSend={handleNewMessage}
              isConnected={isConnected}
            />
          </div>
        </div>
        <div ref={bottomRef} className="m-6" />
        {/* <div className="h-20 opacity-0 border border-red-500" /> */}
      </div>
    </div>
  );
}
