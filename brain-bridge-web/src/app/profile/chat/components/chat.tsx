"use client";

import Data from "@/utils/data";
import { generateRandomInteger } from "@/utils/numbers";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Messages } from "./Messages";

export default function Chat({
  selectedChat,
  session,
}: {
  chats: ConversationStub[];
  selectedChat: Conversation;
  session: Session;
}) {
  const [firstLoad, setFirstLoad] = useState(true);
  const [answerPending, setAnswerPending] = useState(false);
  const [selectedChatMessages, setSelectedChatMessages] = useState(
    selectedChat.messages
  );
  const [currentMessageText, setCurrentMessageText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const getLLMResponse = useCallback(
    async (message: Message) => {
      setAnswerPending(true);
      const llmResponse = await Data.sendMessage(selectedChat.id, message);
      setSelectedChatMessages((messages) => [...messages, llmResponse]);
      setAnswerPending(false);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    },
    [selectedChat.id]
  );

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
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
    <div className="flex flex-col flex-grow">
      <div className="flex-grow w-full p-2 overflow-scroll rounded">
        <Messages
          messages={selectedChatMessages}
          userId={session.user?.name || session.user?.email || "Unknown"}
        />
        {answerPending && (
          <div className="ml-4">
            <FakeTypingIndicator />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <input
        type="text"
        name="message"
        placeholder="Type your message here"
        className="sticky bottom-0 w-full p-2 mt-4 border rounded outline-none bg-slate-900 border-slate-600"
        value={currentMessageText}
        onKeyUp={handleKeyUp}
        onChange={handleTextChanged}
      />
    </div>
  );
}

function FakeTypingIndicator() {
  const [show, setShow] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const i = setTimeout(() => {
      setShow(true);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });

    }, generateRandomInteger(1000, 5000));
    return () => {
      clearTimeout(i);
      setShow(false);
    };
  }, []);
  if (!show) return <> </>;
  return (
    <div className="flex flex-row justify-start">
      <div className="flex flex-row items-center w-10 h-8 mt-2 rounded-lg justify-evenly bg-slate-500 ">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
      </div>
      <div ref={bottomRef} />
    </div>
  );
}


