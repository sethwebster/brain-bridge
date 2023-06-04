"use client";

import {
  type ChatResponseMode,
  type ConversationWithRelations,
  type MessageWithRelations,
} from "~/server/interfaces/types";
import { type Session } from "next-auth";
import { useCallback, useEffect, useRef, useState } from "react";
import ChatDisplay, {
  type Viewer,
  type NewMessage,
} from "~/app/components/ChatDisplay";
// import useAudioPlayer from "~/hooks/useAudioPlayer";
import DataClient from "~/utils/data-client";
import generateId from "~/utils/generate-id";
import { useAuthenticatedSocket } from "~/hooks/use-socket";

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
  const bottomRef = useRef<HTMLDivElement>(null);

  const socket = useAuthenticatedSocket();

  useEffect(() => {
    if (socket) {
      const removeMessageListener = socket.onMessage(
        "message",
        (payload: { message: MessageWithRelations }) => {
          console.log("new message received", payload);
          setAnswerPending(false);
          setSelectedChatMessages((messages) => [...messages, payload.message]);
        }
      );

      const removeTypingIndicatorListener = socket.onMessage(
        "llm-response-started",
        () => {
          setAnswerPending(true);
        }
      );

      return () => {
        removeMessageListener();
        removeTypingIndicatorListener();
      };
    }
  }, [socket]);
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
        setSelectedChatMessages((messages) => [...messages, newMessageAugment]);
        socket.sendMessage("message", { mode, message: newMessageAugment });
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        // await getLLMResponse(newMessageAugment, mode);
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      };
      sendMessage();
    },
    [selectedChat, session.user.id, session.user.name, socket]
  );

  const handleClearChatClicked = useCallback(() => {
    setSelectedChatMessages([]);
    DataClient.clearChat(selectedChat.id).catch((e) => {
      console.log(e);
    });
  }, [selectedChat.id]);

  if (!session.user?.email) throw new Error("No user email");
  return (
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
    />
  );
}
