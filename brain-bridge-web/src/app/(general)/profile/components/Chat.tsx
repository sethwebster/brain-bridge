"use client";

import {
  type ChatResponseMode,
  type ConversationWithRelations,
  type MessageWithRelations,
} from "~/data/interfaces/types";
import { type Session } from "next-auth";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ChatDisplay, {
  type Viewer,
  type NewMessage,
} from "~/app/components/ChatDisplay";
// import useAudioPlayer from "~/hooks/useAudioPlayer";
import DataClient from "~/utils/data-client";
import generateId from "~/utils/generate-id";
import generateChatErrorMessage from "~/utils/error-chat-message-generator";
import { useAuthToken } from "~/hooks/useAuthToken";
import useSocket from "~/hooks/use-socket";
import { toast } from "react-toastify";
import SideBarPaddedContainer from "./SidebarPaddedContainer";
import Logger from "~/lib/logger";
import RoomJoiner from "../../../components/RoomJoiner";
import StreamingJsonParser, {
  type PartialJSONObject,
} from "~/lib/streaming-json-parser";

export default function Chat({
  selectedChat,
  session,
}: {
  selectedChat: ConversationWithRelations;
  session: Session;
}) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  // const [soundPending, setSoundPending] = useState(false);
  const [answerPending, setAnswerPending] = useState<{
    pending: boolean;
    phase: ChatResponseMode;
  }>({ pending: false, phase: "one-shot" });
  // const player = useAudioPlayer();
  const [selectedChatMessages, setSelectedChatMessages] = useState(
    selectedChat.messages
  );
  const [callback, setCallback] = useState<(() => void) | null>(null);
  const socket = useSocket();
  const { token } = useAuthToken();
  const [provisionalText, setProvisionalText] = useState<null | string>(null);
  const [provisionalResponse, setProvisionalResponse] = useState<
    PartialJSONObject | PartialJSONObject[] | null
  >(null);
  const [chatResponseMode, setChatResponseMode] =
    useState<ChatResponseMode>("one-shot");

  const streamingJsonParser = useMemo(() => {
    const [] = [selectedChatMessages.length === 0];
    return new StreamingJsonParser();
  }, [selectedChatMessages]);

  useEffect(() => {
    if (!selectedChat) return;
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
            console.log("HEY");
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
          if (payload.room.includes(selectedChat.id)) {
            if (payload.message.sender.name !== session.user.name) {
              setAnswerPending({ pending: false, phase: "one-shot" });
            }
            setSelectedChatMessages((messages) => [
              ...messages,
              payload.message,
            ]);
            callback?.();
          }
        }
      );

      const removeTypingIndicatorListener = socket.onMessage(
        "llm-response-started",
        (payload: { room: string }) => {
          if (payload.room.includes(selectedChat.id)) {
            Logger.warn("llm-response-started", payload.room);
            setAnswerPending({ pending: true, phase: "one-shot" });
          }
        }
      );

      const removeTypingIndicatorListenerEnded = socket.onMessage(
        "llm-response-ended",
        (payload: { room: string }) => {
          if (payload.room.includes(selectedChat.id)) {
            Logger.warn("llm-response-ended", payload.room);
            setAnswerPending({ pending: false, phase: "one-shot" });
          }
        }
      );

      const removeErrorListener = socket.onMessage(
        "message-error",
        (payload: { error?: string }) => {
          console.log("ERR", payload);
          toast.error(payload.error ?? "Unknown error");
          if (payload.error) {
            if (payload.error === "Invalid OpenAI Api Key") {
              setSelectedChatMessages((messages) => [
                ...messages,
                generateChatErrorMessage(
                  "No valid OpenAI Api key was found. Check your settings page." ??
                    "Unknown error",
                  false
                ),
              ]);
            } else if (
              payload.error === "Training set has not yet been trained."
            ) {
              setSelectedChatMessages((messages) => [
                ...messages,
                generateChatErrorMessage(
                  "This training set has not yet been trained. Please ensure you have trained it before using it.",
                  false
                ),
              ]);
            } else {
              setSelectedChatMessages((messages) => [
                ...messages,
                generateChatErrorMessage(payload.error ?? "Unknown error"),
              ]);
            }
            // setTimeout(() => {
            setAnswerPending(() => ({ pending: false, phase: "one-shot" }));
            // }, 500);
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
    selectedChat,
    selectedChat.id,
    session.user.id,
    session.user.name,
    socket,
    streamingJsonParser,
    token,
  ]);
  // const playVoice = useCallback(
  //   (fileUrl: string) => {
  //     player.play(fileUrl);
  //   },
  //   [player]
  // );

  const handleSend = useCallback(
    (newMessage: NewMessage, mode: ChatResponseMode) => {
      const sendMessage = () => {
        const newMessageAugment: MessageWithRelations = {
          ...newMessage,
          id: generateId(),
          conversationId: selectedChat.id,
          conversation: selectedChat,
          participantId: session.user.id,
          createdAt: new Date(),
          publicChatInstance: null,
          publicChatInstanceId: null,
          sender: {
            conversationId: selectedChat.id,
            createdAt: new Date(),
            updatedAt: new Date(),
            id: session.user.id,
            name: session.user.name || "Human",
            type: "HUMAN",
            publicChatInstanceId: null,
          },
        };
        // setSelectedChatMessages((messages) => [...messages, newMessageAugment]);
        socket.sendMessage("message", { mode, message: newMessageAugment });
      };
      sendMessage();
    },
    [selectedChat, session.user.id, session.user.name, socket]
  );

  // useEffect(() => {
  //   if (selectedChatMessages.length > 0) {
  //     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [selectedChatMessages]);

  const handleClearChatClicked = useCallback(() => {
    setSelectedChatMessages([]);
    DataClient.clearChat(selectedChat.id).catch((e) => {
      Logger.error("Error clearing chat", e);
    });
  }, [selectedChat.id]);

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
      return { ...selectedChat, messages: selectedChatMessages };
    }

    return {
      ...selectedChat,
      messages: [
        ...selectedChatMessages,
        {
          id: "provisional",
          text: text ?? "",
          sender: {
            id: "bot",
            name: "Bot",
            conversationId: selectedChat.id,
            createdAt: new Date(),
            updatedAt: new Date(),
            publicChatInstanceId: null,
            type: "BOT",
          },
          createdAt: new Date(),
          conversation: selectedChat,
          conversationId: selectedChat.id,
          participantId: "provisional",
          publicChatInstance: null,
          publicChatInstanceId: null,
        } as MessageWithRelations,
      ],
    };
  }, [provisionalResponse, selectedChat, selectedChatMessages]);

  if (!session.user?.email) throw new Error("No user email");
  return (
    <SideBarPaddedContainer>
      <RoomJoiner room={selectedChat.id} type="private" />
      <ChatDisplay
        chatResponseMode={chatResponseMode}
        chatType="private"
        answerPending={answerPending}
        soundPending={false}
        // soundPending={soundPending}
        conversation={provisionalConversation}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onNewMessage={handleSend}
        soundEnabled={soundEnabled}
        onSoundEnabledChange={(value) => setSoundEnabled(value)}
        viewer={session.user as Viewer}
        onClearChatClicked={handleClearChatClicked}
        notifyNewMessage={handleNotifyCallbackSet}
        onChatResponseModeChanged={setChatResponseMode}
        isConnected={socket.status === "authenticated" ?? false}
      />
    </SideBarPaddedContainer>
  );
}
