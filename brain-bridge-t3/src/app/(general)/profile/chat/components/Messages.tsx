"use client";
import { type MessageWithRelations } from "~/interfaces/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Messages({
  messages,
  userName,
}: {
  /**
   * The messages to display.
   */
  messages: MessageWithRelations[];
  /**
   * The ID of the user who is viewing the messages.
   */
  userName: string;
}) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-grow flex-col items-center justify-center">
        <p className="text-gray-400">
          No messages yet. Send a message to get started.
        </p>
      </div>
    );
  }
  return (
    <ul className="markdown flex flex-grow flex-col px-4 text-white">
      {messages.map((message) => (
        <li
          className={`flex flex-row ${
            message.sender.name === userName ? "justify-end" : ""
          }`}
          key={`${message.sender.id}-${message.id}`}
        >
          <div
            className={`mt-2 rounded-lg p-2 drop-shadow-md dark:drop-shadow-none ${
              message.sender.name === userName ? "bg-blue-500" : `bg-slate-500`
            }`}
          >
            <>
            {/* {message.sender.id}.{message.sender.name}.{userName} */}
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.text}
              </ReactMarkdown>
            </>
          </div>
        </li>
      ))}
    </ul>
  );
}