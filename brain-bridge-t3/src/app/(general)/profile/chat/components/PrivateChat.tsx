"use client";

import {
  type ChatResponseMode,
  type ConversationWithRelations,
  type MessageWithRelations,
} from "~/data/interfaces/types";
import { type Session } from "next-auth";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { RoomJoiner } from "../../components/RoomJoiner";

export default function PrivateChat({
  selectedChat,
  session,
}: {
  selectedChat: ConversationWithRelations;
  session: Session;
}) {
  const [firstLoad, setFirstLoad] = useState(true);
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

  useEffect(() => {
    if (!selectedChat) return;
    if (socket) {
      // if (token) socket.join(selectedChat.id, "private");
      // const leaveRoom = () => {
      //   if (!token) return;
      //   socket.leave(selectedChat.id, "private");
      // };

      const removeMessageListener = socket.onMessage(
        "message",
        (payload: { message: MessageWithRelations }) => {
          console.log("message", payload.message);
          if (payload.message.sender.name !== session.user.name) {
            setAnswerPending(false);
          }
          setSelectedChatMessages((messages) => [...messages, payload.message]);
          callback?.();
        }
      );

      const removeTypingIndicatorListener = socket.onMessage(
        "llm-response-started",
        () => {
          setAnswerPending(true);
        }
      );

      const removeTypingIndicatorListenerEnded = socket.onMessage(
        "llm-response-ended",
        () => {
          setAnswerPending(false);
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
        removeMessageListener();
        removeTypingIndicatorListener();
        removeTypingIndicatorListenerEnded();
        removeErrorListener();
        // leaveRoom();
      };
    }
  }, [
    callback,
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

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [firstLoad, session.user.email, session.user.name]);

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
        console.log("SENDING MESSAGE", newMessageAugment);
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
      console.log(e);
    });
  }, [selectedChat.id]);

  const handleNotifyCallbackSet = useCallback((callback: () => void) => {
    setCallback(callback);
  }, []);

  if (!session.user?.email) throw new Error("No user email");
  return (
    <div className="w-full pt-20">
      <RoomJoiner room={selectedChat.id} />
      <ChatDisplay
        answerPending={answerPending}
        soundPending={false}
        // soundPending={soundPending}
        conversation={{ ...selectedChat, messages: selectedChatMessages }}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onNewMessage={handleSend}
        soundEnabled={soundEnabled}
        onSoundEnabledChange={(value) => setSoundEnabled(value)}
        viewer={session.user as Viewer}
        onClearChatClicked={handleClearChatClicked}
        notifyNewMessage={handleNotifyCallbackSet}
        isConnected={socket.status === "authenticated" ?? false}
      />
    </div>
  );
}
