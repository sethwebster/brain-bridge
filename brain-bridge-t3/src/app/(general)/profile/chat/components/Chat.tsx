"use client";

import {
  type ChatResponseMode,
  type ConversationWithRelations,
  type MessageWithRelations,
} from "~/data/interfaces/types";
import { type Session } from "next-auth";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import SideBarPaddedContainer from "../../components/SidebarPaddedContainer";
import Logger from "~/lib/logger";
import RoomJoiner from "../../components/RoomJoiner";
import invariant from "tiny-invariant";
import debounce from "lodash.debounce";

export default function Chat({
  selectedChat,
  session,
}: {
  selectedChat: ConversationWithRelations;
  session: Session;
}) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  // const [soundPending, setSoundPending] = useState(false);
  const [answerPending, setAnswerPending] = useState(false);
  // const player = useAudioPlayer();
  const [selectedChatMessages, setSelectedChatMessages] = useState(
    selectedChat.messages
  );
  const [callback, setCallback] = useState<(() => void) | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const socket = useSocket();
  const { token } = useAuthToken();
  const [provisionalText, setProvisionalText] = useState<null | string>(null);

  useEffect(() => {
    if (!selectedChat) return;
    if (socket) {
      // if (token) socket.join(selectedChat.id, "private");
      // const leaveRoom = () => {
      //   if (!token) return;
      //   socket.leave(selectedChat.id, "private");
      // };

      const removeTokenListener = socket.onMessage(
        "message-token",
        (payload: { token: string; conversationId: string }) => {
          const { token } = payload;
          if (cleanUpText(provisionalText ?? "").length > 0) setAnswerPending(false);
          setProvisionalText((prev) => {
            return (prev ?? "") + token;
          });
        }
      );

      const removeMessageListener = socket.onMessage(
        "message",
        (payload: { message: MessageWithRelations; room: string }) => {
          Logger.warn("message", payload.message, payload.room);
          setProvisionalText(null);
          if (payload.room.includes(selectedChat.id)) {
            if (payload.message.sender.name !== session.user.name) {
              setAnswerPending(false);
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
            setAnswerPending(true);
          }
        }
      );

      const removeTypingIndicatorListenerEnded = socket.onMessage(
        "llm-response-ended",
        (payload: { room: string }) => {
          if (payload.room.includes(selectedChat.id)) {
            Logger.warn("llm-response-ended", payload.room);
            setAnswerPending(false);
          }
        }
      );

      const removeErrorListener = socket.onMessage(
        "message-error",
        (payload: { error?: string }) => {
          toast.error(payload.error ?? "Unknown error");
          setAnswerPending(false);
          if (payload.error) {
            setSelectedChatMessages((messages) => [
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
    provisionalText,
    selectedChat,
    selectedChat.id,
    session.user.id,
    session.user.name,
    socket,
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

  useEffect(() => {
    if (selectedChatMessages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

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
    if (!provisionalText)
      return { ...selectedChat, messages: selectedChatMessages };
    const text = cleanUpText(provisionalText);
    if (text.trim().length === 0) return { ...selectedChat, messages: selectedChatMessages };
    return {
      ...selectedChat,
      messages: [
        ...selectedChatMessages,
        {
          id: generateId(),
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
  }, [provisionalText, selectedChat, selectedChatMessages]);

  if (!session.user?.email) throw new Error("No user email");
  return (
    <SideBarPaddedContainer>
      <RoomJoiner room={selectedChat.id} type="private" />
      <ChatDisplay
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
        isConnected={socket.status === "authenticated" ?? false}
      />
    </SideBarPaddedContainer>
  );
}
function cleanUpText(provisionalText: string) {
  const [, responseHead] = (provisionalText ?? "").split('answer": "');
  const [response] = (responseHead ?? "").split('"confidence": "');
  const lastQuote = (response ?? "").lastIndexOf('confidence');
  let text = (response ?? "").substring(0, lastQuote >= 0 ? lastQuote : (response ?? "").length);
  text = text.replace(/\\n/g, "\n");
  text = text.endsWith("\\") ? text.substring(0, text.length - 1) : text;
  return text;
}

