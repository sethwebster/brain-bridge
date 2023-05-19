"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SpeakerIcon } from "../(general)/profile/training/new/components/SvgIcons";
import { Messages } from "../(general)/profile/chat/components/Messages";
import {
  FakeSpeakerIndicator,
  FakeTypingIndicator,
} from "../(general)/profile/chat/components/FakeTypingIndicator";
import NewMessageBox from "./NewMessageBox";

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

  useEffect(() => {
    setTimeout(() => {
      console.log("Scrolling");
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [loadedMessages.length, answerPending, soundPending]);

  return (
    <div className="flex flex-col overflow-scroll bg-slate-100 dark:bg-slate-700">
      <div className="flex-grow w-full ">
        <div className="fixed z-50 flex flex-row justify-end w-5/6 p-2 bg-blue-300 border shadow bg-opacity-80">
          <button
            className={`${
              soundEnabled ? "bg-green-300" : "bg-blue-300"
            } p-2 rounded`}
            onClick={handleSoundEnabledChange}
          >
            <SpeakerIcon />
          </button>
        </div>
        <div className="mt-12">
          <Messages messages={loadedMessages} userId={viewer.id} />
        </div>
        {answerPending && (
          <div className="ml-4">
            <FakeTypingIndicator />
          </div>
        )}
        {soundPending && (
          <div className="ml-4">
            <FakeSpeakerIndicator />
          </div>
        )}
        <div ref={bottomRef} className="m-2" />
      </div>
      <div className="fixed bottom-0 w-full p-2 mt-4 bg-opacity-0 border-red-700 outline-none border-3">
        <NewMessageBox onMessageSend={handleNewMessage} />
      </div>
    </div>
  );
}
