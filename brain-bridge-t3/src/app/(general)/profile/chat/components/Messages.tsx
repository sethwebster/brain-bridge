"use client";
import {
  ChatResponseMode,
  type MessageWithRelations,
} from "~/data/interfaces/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ScrollOnReRender } from "./ScrollOnReRender";
import { TypingIndicator } from "./TypingIndicator";
import invariant from "tiny-invariant";
import { type NormalComponents } from "react-markdown/lib/complex-types";
import { type SpecialComponents } from "react-markdown/lib/ast-to-react";

const MarkdownComponents: Partial<
  Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
> = {
  h1: (props) => <h1 {...props} className="mb-4 mt-8 text-2xl font-bold" />,
  h2: (props) => <h2 {...props} className="mb-4 mt-8 text-xl font-bold" />,
  h3: (props) => <h3 {...props} className="mb-4 mt-8 text-lg font-bold" />,
  p: (props) => <p {...props} className="[&:not(:first-child)]:pt-4">{props.children}</p>,
  ul: ({ children }) => <ul className="list-disc p-2 px-4">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal p-2 px-4">{children}</ol>,
  li: ({ children }) => <li className="p-2 px-4">{children}</li>,
};

export function Messages({
  messages,
  userName,
  answerPending,
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
  answerPending?: { pending: boolean; phase: ChatResponseMode };
}) {
  // const lastRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   lastRef.current?.scrollIntoView({
  //     behavior: "smooth",
  //     // block: "nearest",
  //     // inline: "start",
  //   });
  // }, [messages]);

  invariant(messages, "Messages must be defined");
  if (messages.length === 0) {
    return (
      <div className="flex flex-grow flex-col items-center justify-center">
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
      <ul className="markdown flex flex-grow flex-col px-4 text-white">
        <ul className="list-disc" />
        <ol className="list-decimal" />
        {sorted.map((message) => (
          <li
            className={`flex flex-row  ${
              message.sender.name === userName ? "justify-end" : ""
            }`}
            key={`${message.sender.id}-${message.id}`}
          >
            <div
              className={`mt-2 rounded-lg p-2 drop-shadow-md md:max-w-2xl  ${
                message.sender.name === userName
                  ? "bg-blue-500"
                  : `bg-slate-500`
              }`}
            >
              <>
                {/* {message.sender.id}.{message.sender.name}.{userName} */}
                <div className="text-slate-200 dark:text-slate-300">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={MarkdownComponents}
                  >
                    {message.text}
                  </ReactMarkdown>
                </div>
              </>
            </div>
          </li>
        ))}
        {answerPending && (
          <TypingIndicator
            show={answerPending.pending}
            phase={answerPending.phase}
          />
        )}
      </ul>
      <div className="">
        <ScrollOnReRender />
      </div>
    </>
  );
}
