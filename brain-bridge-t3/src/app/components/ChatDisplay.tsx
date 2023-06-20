"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import NewMessageBox from "./NewMessageBox";
import { ChatToolbar } from "./ChatToolbar";
import { type Participant } from "@prisma/client";
import { Messages } from "../(general)/profile/chat/components/Messages";
import {
  FakeSpeakerIndicator,
  TypingIndicator,
} from "../(general)/profile/chat/components/TypingIndicator";
import {
  type ChatResponseMode,
  type MessageWithRelations,
} from "~/data/interfaces/types";

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
  answerPending: boolean;
  soundPending: boolean;
  soundEnabled: boolean;
  onNewMessage: (newMessage: NewMessage, mode: ChatResponseMode) => void;
  onSoundEnabledChange: (soundEnabled: boolean) => void;
  onClearChatClicked: () => void;
  notifyNewMessage: (callback: () => void) => void;
  isConnected: boolean;
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
  isConnected
}: ChatProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [chatMode, setChatMode] = useState<ChatResponseMode>("one-shot");
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
        chatMode
      );
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    },
    [chatMode, onNewMessage, viewer]
  );

  const handleTypingIndicatorShown = useCallback(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const handleChatModeSelectionChanged = useCallback(
    (mode: ChatResponseMode) => {
      setChatMode(mode);
    },
    []
  );

  useEffect(() => {
    setTimeout(() => {
      // if (bottomRef.current?.checkVisibility()) return;
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [answerPending, soundPending]);

  return (
    <div className="mb-20 flex h-full w-full flex-col overflow-scroll bg-slate-100 dark:bg-slate-700 ">
      <ChatToolbar
        chatMode={chatMode}
        onModeSelectionChanged={handleChatModeSelectionChanged}
        soundEnabled={soundEnabled}
        soundPending={soundPending}
        onSoundEnabledClick={handleSoundEnabledChange}
        onClearChatClick={handleClearChatClicked}
      />
      <div className="h-full w-full flex-grow">
        <div className="pt-6">
          <Messages
            messages={conversation.messages}
            userName={viewer.name || viewer.email || viewer.id}
          />
        </div>
        <div className="ml-4">
          <TypingIndicator
            show={answerPending}
            onShown={handleTypingIndicatorShown}
          />
        </div>
        {soundPending && (
          <div className="ml-4">
            <FakeSpeakerIndicator />
          </div>
        )}
        <div ref={bottomRef} className="m-6" />
        <div className="h-20 opacity-0" />
      </div>
      <div className="fixed bottom-0 ml-4 w-10/12 sm:ml-3 sm:w-4/5 ">
        <div className="sticky bottom-0 mt-4 flex w-full bg-opacity-0 p-2 outline-none">
          <NewMessageBox onMessageSend={handleNewMessage} isConnected={isConnected} />
        </div>
      </div>
    </div>
  );
}
