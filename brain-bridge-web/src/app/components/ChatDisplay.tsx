"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Messages } from "../(general)/profile/chat/components/Messages";
import {
  FakeSpeakerIndicator,
  FakeTypingIndicator,
} from "../(general)/profile/chat/components/FakeTypingIndicator";
import NewMessageBox from "./NewMessageBox";
import { ChatToolbar } from "./ChatToolbar";

interface ChatProps {
  viewer: Viewer;
  loadedMessages: Message[];
  // currentMessageText: string;
  answerPending: boolean;
  soundPending: boolean;
  soundEnabled: boolean;
  onNewMessage: (newMessage: Message) => void;
  onSoundEnabledChange: (soundEnabled: boolean) => void;
}

export default function ChatDisplay({
  viewer,
  loadedMessages,
  answerPending,
  soundPending,
  soundEnabled,
  onNewMessage,
  onSoundEnabledChange,
}: ChatProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSoundEnabledChange = useCallback(() => {
    onSoundEnabledChange(!soundEnabled);
  }, [onSoundEnabledChange, soundEnabled]);

  const handleNewMessage = useCallback(
    (message: string) => {
      onNewMessage({
        id: -1,
        text: message,
        timestamp: new Date().toISOString(),
        sender: viewer.id,
      });
    },
    [onNewMessage, viewer.id]
  );

  const handleTypingIndicatorShown = useCallback((visible: boolean) => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      // if (bottomRef.current?.checkVisibility()) return;
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [loadedMessages.length, answerPending, soundPending]);

  return (
    <div className="flex flex-col w-full h-full mb-20 overflow-scroll bg-slate-100 dark:bg-slate-700">
      <ChatToolbar
        soundEnabled={soundEnabled}
        soundPending={soundPending}
        onSoundEnabledClick={handleSoundEnabledChange}
      />
      <div className="flex-grow w-full h-full">
        <div className="pt-6">
          <Messages messages={loadedMessages} userId={viewer.id} />
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
      <div className="fixed bottom-0 w-10/12 ml-4 sm:w-4/5 sm:ml-3 ">
        <div className="sticky bottom-0 flex w-full p-2 mt-4 bg-opacity-0 outline-none">
          <NewMessageBox onMessageSend={handleNewMessage} />
        </div>
      </div>
    </div>
  );
}
