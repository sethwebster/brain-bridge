"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { type Conversation } from "@prisma/client";
import {
  type ChatResponseMode,
  type MessageWithRelations,
} from "~/data/interfaces/types";
import ChatDisplay, {
  type ConversationLike,
  type NewMessage,
  type Viewer,
} from "~/app/components/ChatDisplay";
import { useSession } from "next-auth/react";
import useSocket from "~/hooks/use-socket";
import { useAuthToken } from "~/hooks/useAuthToken";
import generateChatErrorMessage from "~/utils/error-chat-message-generator";
import generateId from "~/utils/generate-id";
import debounce from "lodash.debounce";
import Logger from "~/lib/logger";

interface AutoTrainingProps {
  oldPrompt: string;
  onPromptGenerated: (prompt: string) => void;
}

export function AutoTraining({
  oldPrompt,
  onPromptGenerated,
}: AutoTrainingProps) {
  const session = useSession();
  const [conversation, setConversation] = useState<ConversationLike>({
    id: "generator",
    messages: [],
    participants: [
      {
        id: "human",
        conversationId: "generator",
        name: "Human",
        type: "HUMAN",
        createdAt: new Date(),
        updatedAt: new Date(),
        publicChatInstanceId: null,
      },
      {
        id: "bot",
        conversationId: "generator",
        name: "Bot",
        type: "BOT",
        createdAt: new Date(),
        updatedAt: new Date(),
        publicChatInstanceId: null,
      },
    ],
  });
  const [chatResponseMode, setChatResponseMode] =
    useState<ChatResponseMode>("one-shot");

  const user = {
    ...session.data?.user,
    id: session.data?.user.id,
    name: session.data?.user.name,
    email: session.data?.user.email,
  } as Viewer;

  const [answerPending, setAnswerPending] = useState<{
    pending: boolean;
    phase: ChatResponseMode;
  }>({ pending: false, phase: "one-shot" });
  const [callback, setCallback] = useState<() => void>(() => () => {
    Logger.warn("callback not set");
  });
  const socket = useSocket();
  const { token } = useAuthToken();

  const handleNotifyCallbackSet = useCallback((callback: () => void) => {
    setCallback(callback);
  }, []);

  const handleSend = useCallback(
    (newMessage: NewMessage, mode: ChatResponseMode) => {
      if (
        !session ||
        !session.data ||
        !session.data.user ||
        !session.data.user.name
      )
        return;
      const sendMessage = () => {
        const newMessageAugment: MessageWithRelations = {
          ...newMessage,
          id: generateId(),
          conversationId: "generator",
          conversation: conversation as unknown as Conversation,
          participantId: "human",
          createdAt: new Date(),
          publicChatInstance: null,
          publicChatInstanceId: null,
          sender: {
            conversationId: "generator",
            createdAt: new Date(),
            updatedAt: new Date(),
            id: session.data.user.id,
            name: session?.data?.user?.name ?? "human",
            type: "HUMAN",
            publicChatInstanceId: null,
          },
        };
        const updated = {
          ...conversation,
          messages: [...conversation.messages, newMessageAugment],
        };
        setConversation((conversation) => ({ ...conversation, ...updated }));
        const history = conversation.messages
          .map((m) => {
            return `${m.sender.name}: ${m.text}`;
          })
          .join("\n");
        socket.sendMessage("prompt-generator-message", {
          mode,
          message: newMessageAugment,
          history,
        });
      };
      callback?.();
      sendMessage();
    },
    [callback, conversation, session, socket]
  );

  const intitalizationState = useRef<{
    first: boolean;
    sent: boolean;
    timeout: NodeJS.Timeout | null;
  }>({
    first: true,
    sent: false,
    timeout: null,
  });

  const getPromptOutput = useCallback((text: string) => {
    const regex = new RegExp(/<prompt>([\s\S]*)<\/prompt>/gm);
    const matches = regex.exec(text);
    return matches;
  }, []);

  const sendIntroMessage = useCallback(() => {
    let text = "Sounds good. Let's get started.";

    if (oldPrompt && oldPrompt.trim().length > 0) {
      text = `
        Sounds good. Let's get started. Using the information you now understand, we're going to work to refine the prompt that follows.

        Ask me what seems to be working, and what isn't. Then, generate a new prompt that follows the original format, but incorporates my feedback. Think step-by-step.
        Do not just generate a new prompt automatically, talk with the human about it first. And make sure to FILL OUT ALL SECTIONS with MY input.

        Your next response should be THIS, and nothing different:

        Let's work on refining your prompt. For reference, here is your current prompt:
        \`\`\`yaml
        ${oldPrompt}
        \`\`\`

        What's working well? What isn't? You can also ask me to just start over if you want to try a new prompt.
        `;
      }
      
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    debounce(() => {
      socket.sendMessage("prompt-generator-message", {
        mode: "one-shot",
        message: {
          text,
        },
        history: "",
        userName: session.data?.user?.name ?? "human",
      });
    }, 500)();
  }, [oldPrompt, session.data?.user?.name, socket]);

  useEffect(() => {
    if (socket) {
      const removeMessageListener = socket.onMessage(
        "prompt-generator-message",
        (payload: { message: MessageWithRelations }) => {
          setAnswerPending({ pending: false, phase: "one-shot" });
          const promptMatch = getPromptOutput(payload.message.text);
          if (promptMatch && promptMatch?.length > 0) {
            const match = promptMatch[1]?.trim();
            if (match) onPromptGenerated?.(match);
          } else {
            setConversation((conversation) => ({
              ...conversation,
              messages: [
                ...conversation.messages,
                { ...payload.message, id: generateId() },
              ],
            }));
          }
          callback?.();
        }
      );

      const removeTypingIndicatorListener = socket.onMessage(
        "llm-response-started",
        () => {
          setAnswerPending({ pending: true, phase: "one-shot" });
        }
      );

      const removeResponseCompleteListener = socket.onMessage(
        "llm-response-complete",
        () => {
          setAnswerPending({ pending: false, phase: "one-shot" });
        }
      );

      const removeErrorListener = socket.onMessage(
        "message-error",
        (payload: { error?: string }) => {
          setAnswerPending({ pending: false, phase: "one-shot" });
          if (payload.error) {
            setConversation((conversation) => ({
              ...conversation,
              messages: [
                ...conversation.messages,
                generateChatErrorMessage(payload.error ?? "Unknown error"),
              ],
            }));
          }
        }
      );

      if (intitalizationState.current.first && token) {
        sendIntroMessage();
        intitalizationState.current.first = false;
      }
      return () => {
        removeMessageListener();
        removeTypingIndicatorListener();
        removeErrorListener();
        removeResponseCompleteListener();
      };
    }
  }, [
    callback,
    getPromptOutput,
    onPromptGenerated,
    sendIntroMessage,
    socket,
    token,
  ]);

  return (
    <ChatDisplay
      chatType="private"
      chatResponseMode={chatResponseMode}
      isConnected={socket.status === "authenticated"}
      viewer={user}
      answerPending={answerPending}
      conversation={conversation}
      notifyNewMessage={handleNotifyCallbackSet}
      onClearChatClicked={() => Logger.info}
      onNewMessage={handleSend}
      onSoundEnabledChange={() => Logger.info}
      onChatResponseModeChanged={setChatResponseMode}
      soundPending={false}
      soundEnabled={false}
    />
  );
}
