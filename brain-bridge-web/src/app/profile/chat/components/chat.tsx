"use client";

import Data from "@/utils/data";
import { generateRandomInteger } from "@/utils/numbers";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Chat({
  selectedChat,
  session,
}: {
  chats: ChatStub[];
  selectedChat: Chat;
  session: Session;
}) {
  const [answerPending, setAnswerPending] = useState(false);
  const [selectedChatMessages, setSelectedChatMessages] = useState(
    selectedChat.messages
  );
  const [currentMessageText, setCurrentMessageText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const handleSend = useCallback(
    (newMessage: Message) => {
      const sendMessage = async () => {
        setAnswerPending(true);
        // const response = await fetch(`/api/chat/${selectedChat.id}`, {
        //   method: "PUT",
        //   body: JSON.stringify(newMessage),
        // });
        // if (!response.ok) throw new Error("Failed to send message");
        // const { message } = await response.json();
        // console.log(message);
        setSelectedChatMessages((messages) => [
          ...messages,
          { ...newMessage, id: selectedChatMessages.length + 1 },
        ]);
        const llmResponse = await Data.sendMessage(selectedChat.id, newMessage);
        console.log(llmResponse);
        setSelectedChatMessages((messages) => [...messages, llmResponse]);
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        setAnswerPending(false);
      };
      sendMessage();
    },
    [selectedChat.id, selectedChatMessages.length]
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      if (event.key === "Enter") {
        handleSend({
          sender: "sethwebster@gmail.com",
          text: currentMessageText,
          id: -1,
          timestamp: new Date().toISOString(),
        });
        setCurrentMessageText("");
      }
    },
    [currentMessageText, handleSend]
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
          userId={session?.user?.email}
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
  console.log(generateRandomInteger(1000, 5000));
  useEffect(() => {
    const i = setTimeout(() => {
      setShow(true);
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
    </div>
  );
}

function Messages({
  messages,
  userId,
}: {
  messages: Message[];
  userId: string;
}) {
  return (
    <ul className="flex flex-col flex-grow px-4">
      {messages.map((message) => (
        <li
          className={`flex flex-row ${
            message.sender === userId ? "justify-end" : ""
          }`}
          key={message.id}
        >
          <div
            className={`mt-2 p-2 rounded-lg ${
              message.sender === userId ? "bg-blue-500" : `bg-slate-500`
            }`}
          >
            {message.text}
          </div>
        </li>
      ))}
    </ul>
  );
}
