"use client";

import { useCallback, useState } from "react";

export default function Chat({
  selectedChat,
}: {
  chats: ChatStub[];
  selectedChat: Chat;
}) {
  const [selectedChatMessages, setSelectedChatMessages] = useState(
    selectedChat.messages
  );
  const [currentMessageText, setCurrentMessageText] = useState("");
  const handleSend = useCallback((newMessage: Message) => {
    const sendMessage = async () => {
      const response = await fetch(`/api/chat/${selectedChat.id}`, {
        method: "PUT",
        body: JSON.stringify(newMessage),
      });
      if (!response.ok) throw new Error("Failed to send message");
      const {message} = await response.json();
      console.log(message);
      setSelectedChatMessages((messages) => [...messages, message]);
    }
    sendMessage();
  }, [selectedChat.id]);
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
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex-grow w-full p-2 border rounded border-slate-600">
        <Messages messages={selectedChatMessages} />
      </div>
      <input
        type="text"
        name="message"
        placeholder="Type your message here"
        className="w-full p-2 mt-4 border rounded outline-none bg-slate-900 border-slate-600"
        value={currentMessageText}
        onKeyUp={handleKeyUp}
        onChange={handleTextChanged}
      />
    </div>
  );
}

function Messages({ messages }: { messages: Message[] }) {
  return (
    <ul className="flex flex-col flex-grow">
      {messages.map((message) => (
        <li className="flex flex-row" key={message.id}>
          {message.sender}: {message.text}
        </li>
      ))}
    </ul>
  );
}
