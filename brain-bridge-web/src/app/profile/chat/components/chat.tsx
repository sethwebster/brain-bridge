"use client";

import Data from "@/utils/data";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Messages } from "./Messages";
import {
  FakeSpeakerIndicator,
  FakeTypingIndicator,
} from "./FakeTypingIndicator";
import { SpeakerIcon } from "../../training/new/components/svg-icons";
import useAudioPlayer from "@/hooks/useAudioPlayer";

export default function Chat({
  selectedChat,
  session,
}: {
  chats: ConversationStub[];
  selectedChat: Conversation;
  session: Session;
}) {
  const [firstLoad, setFirstLoad] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundPending, setSoundPending] = useState(false);
  const [answerPending, setAnswerPending] = useState(false);
  const player = useAudioPlayer();
  const [selectedChatMessages, setSelectedChatMessages] = useState(
    selectedChat.messages
  );
  const [currentMessageText, setCurrentMessageText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const playVoice = useCallback((fileUrl: string) => {
    player.play(fileUrl);
  }, [player]);

  const getLLMResponse = useCallback(
    async (message: Message) => {
      setAnswerPending(true);
      const llmResponse = await Data.sendMessage(selectedChat.id, message);
      setSelectedChatMessages((messages) => [...messages, llmResponse]);
      setAnswerPending(false);
      if (soundEnabled) {
        setSoundPending(true);
        const voice = await Data.getVoiceMessage(selectedChat.id, llmResponse);
        setSoundPending(false);

        playVoice(voice.file);
      }
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    },
    [playVoice, selectedChat.id, soundEnabled]
  );

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      // getLLMResponse({
      //   sender: session.user?.name || session.user?.email || "Unknown",
      //   text: `Hello, I'm ${
      //     session.user?.name || session.user?.email || "Unknown"
      //   }.`,
      //   id: -1,
      //   timestamp: new Date().toISOString(),
      // });
    }
  }, [firstLoad, getLLMResponse, session.user?.email, session.user?.name]);

  const handleSend = useCallback(
    (newMessage: Message) => {
      const sendMessage = async () => {
        setSelectedChatMessages((messages) => [
          ...messages,
          { ...newMessage, id: selectedChatMessages.length + 1 },
        ]);
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        await getLLMResponse(newMessage);
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      };
      sendMessage();
    },
    [getLLMResponse, selectedChatMessages.length]
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      if (event.key === "Enter") {
        handleSend({
          sender: session.user?.name || session.user?.email || "Unknown",
          text: currentMessageText,
          id: -1,
          timestamp: new Date().toISOString(),
        });
        setCurrentMessageText("");
      }
    },
    [currentMessageText, handleSend, session.user?.email, session.user?.name]
  );

  const handleTextChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentMessageText(event.target.value);
    },
    []
  );

  if (!session.user?.email) throw new Error("No user email");
  return (
    <div className="flex flex-col w-full h-full bg-slate-100 dark:bg-slate-700">
      <div className="flex-grow w-full p-2 overflow-scroll rounded">
        <div className="fixed z-50 flex flex-row justify-end w-5/6 p-2 bg-blue-300 border rounded-md shadow bg-opacity-80 md:w-3/4">
          <button
            className={`${
              soundEnabled ? "bg-green-300" : "bg-blue-300"
            } p-2 rounded`}
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            <SpeakerIcon />
          </button>
        </div>
        <div className="mt-10">
          <Messages
            messages={selectedChatMessages}
            userId={session.user?.name || session.user?.email || "Unknown"}
          />
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
      <div className="sticky bottom-0 w-full p-2 mt-4 bg-opacity-0 outline-none">
        <input
          type="text"
          name="message"
          placeholder="Type your message here"
          className="sticky w-full h-auto p-2 mb-4 border rounded shadow-inner outline-none bg-slate-100 dark:bg-slate-900 border-slate-600 bg-opacity-95"
          value={currentMessageText}
          onKeyUp={handleKeyUp}
          onChange={handleTextChanged}
        />
      </div>
    </div>
  );
}
