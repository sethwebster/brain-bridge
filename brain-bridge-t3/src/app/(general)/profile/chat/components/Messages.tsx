"use client";
import { type MessageWithRelations } from "~/data/interfaces/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ScrollOnReRender } from "./ScrollOnReRender";
import { TypingIndicator } from "./TypingIndicator";

export function Messages({
  messages,
  userName,
  answerPending
}: {
  /**
   * The messages to display.
   */
  messages: MessageWithRelations[];
  /**
   * The ID of the user who is viewing the messages.
   */
  userName: string;
  /**
   * show the typing indicator
   */
  answerPending?: boolean;
}) {
  // const lastRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   lastRef.current?.scrollIntoView({
  //     behavior: "smooth",
  //     // block: "nearest",
  //     // inline: "start",
  //   });
  // }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-gray-400">
          No messages yet. Send a message to get started.
        </p>
      </div>
    );
  }

  const sorted = messages.sort((a, b) => {
    return a.createdAt < b.createdAt ? -1 : 1;
  });
  

  return (
    <>
      <ul className="flex flex-col flex-grow px-4 text-white markdown">
        {sorted.map((message) => (
          <li
            className={`flex flex-row ${
              message.sender.name === userName ? "justify-end" : ""
            }`}
            key={`${message.sender.id}-${message.id}`}
          >
            <div
              className={`mt-2 rounded-lg p-2 drop-shadow-md dark:drop-shadow-none ${
                message.sender.name === userName
                  ? "bg-blue-500"
                  : `bg-slate-500`
              }`}
            >
              <>
                {/* {message.sender.id}.{message.sender.name}.{userName} */}
                <div className="prose lg:prose-md text-slate-200 dark:text-slate-300">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.text}
                  </ReactMarkdown>
                </div>
              </>
            </div>
          </li>
        ))}
        {answerPending && (
          <TypingIndicator
          show={answerPending}
        />
        )}
      </ul>
      <div className="">
        <ScrollOnReRender />
      </div>
    </>
  );
}
