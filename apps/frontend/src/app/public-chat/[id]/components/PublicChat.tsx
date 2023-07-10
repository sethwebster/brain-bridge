"use client";
import { type Participant, type PublicChat } from "@prisma/client";
import { setCookie } from "cookies-next";
import { useCallback, useEffect, useMemo, useState } from "react";
import ChatDisplay, { type NewMessage } from "@/app/components/ChatDisplay";
import {
  type ChatResponseMode,
  type MessageWithRelations,
  type PublicChatInstanceWithRelations,
} from "@/data/interfaces/types";
import DataClient from "@/utils/data-client";
import generateId from "@/utils/generate-id";
import { safeGetJSONCookieClient } from "@/utils/safe-get-json-cookie-client";
import useSocket from "@/hooks/use-socket";
import generateChatErrorMessage from "@/utils/error-chat-message-generator";
import { useSession } from "next-auth/react";
import { CheckLogin } from "@/app/login/CheckLogin";
import { useAuthToken } from "@/hooks/useAuthToken";
import StreamingJsonParser, {
  type PartialJSONObject,
} from "@/lib/streaming-json-parser";
import Logger from "@/lib/logger";
import { toast } from "react-toastify";

interface PublicChatProps {
  viewer: Participant;
  publicChat: PublicChat;
  publicChatInstance: PublicChatInstanceWithRelations;
}
export default function PublicChat({
  viewer,
  publicChat,
  publicChatInstance,
}: PublicChatProps) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundPending] = useState(false);
  const [loadedMessages, setLoadedMessages] = useState<MessageWithRelations[]>(
    publicChatInstance.messages
  );
  const [answerPending, setAnswerPending] = useState<{
    pending: boolean;
    phase: ChatResponseMode;
  }>({ pending: false, phase: "one-shot" });
  const [chatResponseMode, setChatResponseMode] =
    useState<ChatResponseMode>("one-shot");

  const [callback, setCallback] = useState<(() => void) | null>(null);
  const session = useSession();
  // const player = useAudioPlayer();
  const socket = useSocket();
  const { token } = useAuthToken();
  const [provisionalText, setProvisionalText] = useState<null | string>(null);
  const [provisionalResponse, setProvisionalResponse] = useState<
    PartialJSONObject | PartialJSONObject[] | null
  >(null);

  useEffect(() => {
    setCookie("viewer-id", viewer.id, { sameSite: "strict" });
    const userChats = safeGetJSONCookieClient<{ [k: string]: string }>(
      "chats",
      {}
    ) as { [k: string]: string };
    userChats[publicChat.id] = publicChatInstance.id;
    setCookie("chats", JSON.stringify(userChats), { sameSite: "strict" });
  }, [publicChat.id, publicChatInstance.id, viewer.id]);

  const streamingJsonParser = useMemo(() => {
    const [] = [loadedMessages.length === 0];
    return new StreamingJsonParser();
  }, [loadedMessages.length]);

  useEffect(() => {
    if (!publicChatInstance) return;
    if (socket) {
      const removeTokenListener = socket.onMessage(
        "message-token",
        (payload: {
          token: string;
          conversationId: string;
          responsePhase: ChatResponseMode;
        }) => {
          // console.log("message-token", payload);
          const { token, responsePhase } = payload;
          streamingJsonParser.consume(token);
          const message = streamingJsonParser.getObject();
          setProvisionalResponse(message);
          if (responsePhase === chatResponseMode) {
            let pending = false;
            if (Array.isArray(message)) {
              switch (chatResponseMode) {
                case "one-shot":
                  pending =
                    (message.at(0) as { answer: string })?.answer?.length ===
                      0 ?? true;
                  break;
                case "critique":
                  pending =
                    (message.at(1) as { critique: string })?.critique
                      ?.length === 0 ?? true;
                  break;
                case "refine":
                  pending =
                    (message.at(2) as { refined: string })?.refined?.length ===
                      0 ?? true;
                  break;
              }
            } else {
              pending =
                (message as { answer: string })?.answer?.length === 0 ?? true;
              console.log(message, pending);
            }
            setAnswerPending({ pending, phase: responsePhase });
          }
        }
      );

      const removeMessageListener = socket.onMessage(
        "message",
        (payload: { message: MessageWithRelations; room: string }) => {
          Logger.warn("message", payload.message, payload.room);
          setProvisionalText(null);
          setProvisionalResponse(null);
          if (payload.room.includes(publicChatInstance.id)) {
            if (payload.message.sender.name !== viewer.name) {
              setAnswerPending({ pending: false, phase: "one-shot" });
            }
            setLoadedMessages((messages) => [...messages, payload.message]);
            callback?.();
          }
        }
      );

      const removeTypingIndicatorListener = socket.onMessage(
        "llm-response-started",
        (payload: { room: string }) => {
          if (payload.room.includes(publicChatInstance.id)) {
            Logger.warn("llm-response-started", payload.room);
            setAnswerPending({ pending: true, phase: "one-shot" });
          }
        }
      );

      const removeTypingIndicatorListenerEnded = socket.onMessage(
        "llm-response-ended",
        (payload: { room: string }) => {
          if (payload.room.includes(publicChatInstance.id)) {
            Logger.warn("llm-response-ended", payload.room);
            setAnswerPending({ pending: false, phase: "one-shot" });
          }
        }
      );

      const removeErrorListener = socket.onMessage(
        "message-error",
        (payload: { error?: string }) => {
          toast.error(payload.error ?? "Unknown error");
          setAnswerPending({ pending: false, phase: "one-shot" });
          if (payload.error) {
            setLoadedMessages((messages) => [
              ...messages,
              generateChatErrorMessage(payload.error ?? "Unknown error"),
            ]);
          }
        }
      );

      return () => {
        removeTokenListener();
        removeMessageListener();
        removeTypingIndicatorListener();
        removeTypingIndicatorListenerEnded();
        removeErrorListener();
        // leaveRoom();
      };
    }
  }, [
    callback,
    chatResponseMode,
    provisionalText,
    publicChatInstance,
    socket,
    streamingJsonParser,
    token,
    viewer.name,
  ]);

  // const playVoice = useCallback(
  //   (fileUrl: string) => {
  //     player.play(fileUrl);
  //   },
  //   [player]
  // );
  const handleNewMessage = useCallback(
    (newMessage: NewMessage, _mode: ChatResponseMode) => {
      const formattedMessage: MessageWithRelations = {
        ...newMessage,
        id: generateId(),
        createdAt: new Date(),
        sender: viewer,
        conversationId: null,
        conversation: null,
        publicChatInstance,
        text: newMessage.text,
        publicChatInstanceId: publicChatInstance.id,
        participantId: viewer.id,
      };
      // setLoadedMessages((messages) => [...messages, formattedMessage]);
      socket.sendMessage("message", { mode: chatResponseMode, message: formattedMessage });
    },
    [chatResponseMode, publicChatInstance, socket, viewer]
  );

  const handleClearChatClicked = useCallback(async () => {
    setLoadedMessages([]);
    await DataClient.clearPublicChatMessages(publicChatInstance.id);
  }, [publicChatInstance.id]);

  const handleSoundEnabledChanged = useCallback(
    (enabled: boolean) => setSoundEnabled(enabled),
    []
  );

  const handleNotifyCallbackSet = useCallback((callback: () => void) => {
    setCallback(callback);
  }, []);

  const provisionalConversation = useMemo(() => {
    const answer = provisionalResponse;
    let text = "";
    if (Array.isArray(answer)) {
      const oneShot = answer[0];
      const critique = answer[1];
      const refined = answer[2];
      // console.log(streamingJsonParser.id, "ITEM", item)
      if (oneShot) {
        text = (oneShot.answer as string) || "";
      }
      if (critique) {
        setAnswerPending({ pending: true, phase: "critique" });
        text += `\n### --- critique ---\n ${
          (critique.critique as string) || ""
        }`;
      }
      if (refined) {
        setAnswerPending({ pending: true, phase: "refine" });
        text += `\n### --- refined --- \n ${(refined.refined as string) || ""}`;
      }
    } else {
      text = (answer?.answer ?? "") as string;
    }
    if (!answer || !text || text.trim().length === 0) {
      return { ...publicChatInstance, messages: loadedMessages };
    }

    return {
      ...publicChatInstance,
      messages: [
        ...loadedMessages,
        {
          id: "provisional",
          text: text ?? "",
          sender: {
            id: "bot",
            name: "Bot",
            conversationId: publicChatInstance.id,
            createdAt: new Date(),
            updatedAt: new Date(),
            publicChatInstanceId: null,
            type: "BOT",
          },
          createdAt: new Date(),
          participantId: "provisional",
          publicChatInstance: publicChatInstance,
          publicChatInstanceId: publicChatInstance.id,
          conversation: null,
          conversationId: null,
        } as MessageWithRelations,
      ],
    };
  }, [loadedMessages, provisionalResponse, publicChatInstance]);

  return (
    <>
      {!session ||
        (session.status != "authenticated" && (
          <CheckLogin provider="anonymous" />
        ))}
      <div className="h-auto min-h-full w-full overflow-scroll bg-slate-100 dark:bg-slate-700">
        <ChatDisplay
          chatType="public"
          chatResponseMode={chatResponseMode}
          isConnected={socket.status === "authenticated" ?? false}
          viewer={viewer}
          conversation={provisionalConversation}
          onNewMessage={handleNewMessage}
          onSoundEnabledChange={handleSoundEnabledChanged}
          soundEnabled={soundEnabled}
          answerPending={answerPending}
          soundPending={soundPending}
          // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-misused-promises
          onClearChatClicked={handleClearChatClicked}
          notifyNewMessage={handleNotifyCallbackSet}
          onChatResponseModeChanged={setChatResponseMode}
        />
      </div>
    </>
  );
}
