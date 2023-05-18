"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Messages({
  messages,
  userId,
}: {
  /**
   * The messages to display.
   */
  messages: Message[];
  /**
   * The ID of the user who is viewing the messages.
   */
  userId: string;
}) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-gray-400">
          No messages yet. Send a message to get started.
        </p>
      </div>
    );
  }
  return (
    <ul className="flex flex-col flex-grow px-4 text-white markdown">
      {messages.map((message) => (
        <li
          className={`flex flex-row ${
            message.sender === userId ? "justify-end" : ""
          }`}
          key={`${message.sender}-${message.id}`}
        >
          <div
            className={`mt-2 p-2 rounded-lg drop-shadow-md dark:drop-shadow-none ${
              message.sender === userId ? "bg-blue-500" : `bg-slate-500`
            }`}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.text}
            </ReactMarkdown>
          </div>
        </li>
      ))}
    </ul>
  );
}
