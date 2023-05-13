"use client";
export function Messages({
  messages, userId,
}: {
  messages: Message[];
  userId: string;
}) {
  return (
    <ul className="flex flex-col flex-grow px-4">
      {messages.map((message) => (
        <li
          className={`flex flex-row ${message.sender === userId ? "justify-end" : ""}`}
          key={message.id}
        >
          <div
            className={`mt-2 p-2 rounded-lg ${message.sender === userId ? "bg-blue-500" : `bg-slate-500`}`}
          >
            {message.text}
          </div>
        </li>
      ))}
    </ul>
  );
}
