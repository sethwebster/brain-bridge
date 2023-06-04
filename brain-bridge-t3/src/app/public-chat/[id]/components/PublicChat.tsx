"use client";
import { type Participant, type PublicChat } from "@prisma/client";
import { setCookie } from "cookies-next";
import { useCallback, useEffect, useState } from "react";
import ChatDisplay, { type NewMessage } from "~/app/components/ChatDisplay";
import {
  type ChatResponseMode,
  type MessageWithRelations,
  type PublicChatInstanceWithRelations,
} from "~/server/interfaces/types";
import DataClient from "~/utils/data-client";
import generateId from "~/utils/generate-id";
import { safeGetJSONCookieClient } from "~/utils/safe-get-json-cookie-client";
import useSocket from "~/hooks/use-socket";
import generateChatErrorMessage from "~/utils/error-chat-message-generator";

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
  const [answerPending, setAnswerPending] = useState(false);
  const [soundPending] = useState(false);
  const [loadedMessages, setLoadedMessages] = useState<MessageWithRelations[]>(
    publicChatInstance.messages
  );
  // const player = useAudioPlayer();
  const socket = useSocket();

  useEffect(() => {
    setCookie("viewer-id", viewer.id, { sameSite: "strict" });
    const userChats = safeGetJSONCookieClient<{ [k: string]: string }>(
      "chats",
      {}
    ) as { [k: string]: string };
    userChats[publicChat.id] = publicChatInstance.id;
    setCookie("chats", JSON.stringify(userChats), { sameSite: "strict" });
  }, [publicChat.id, publicChatInstance.id, viewer.id]);

  useEffect(() => {
    if (socket) {
      const removeMessageListener = socket.onMessage(
        "message",
        (payload: { message: MessageWithRelations }) => {
          console.log("new message received", payload);
          setAnswerPending(false);
          setLoadedMessages((messages) => [...messages, payload.message]);
        }
      );

      const removeTypingIndicatorListener = socket.onMessage(
        "llm-response-started",
        () => {
          setAnswerPending(true);
        }
      );

      const removeErrorListener = socket.onMessage(
        "message-error",
        (payload: { error?: string }) => {
          console.log("message error received", payload);
          setAnswerPending(false);
          console.log("payload.error", payload.error);
          if (payload.error) {
            setLoadedMessages((messages) => [
              ...messages,
              generateChatErrorMessage(payload.error ?? "Unknown error"),
            ]);
          }
        }
      );

      return () => {
        removeMessageListener();
        removeTypingIndicatorListener();
        removeErrorListener();
      };
    }
  }, [socket]);

  // const playVoice = useCallback(
  //   (fileUrl: string) => {
  //     player.play(fileUrl);
  //   },
  //   [player]
  // );
  const handleNewMessage = useCallback(
    (newMessage: NewMessage, mode: ChatResponseMode) => {
      setAnswerPending(true);
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
      setLoadedMessages((messages) => [...messages, formattedMessage]);
      socket.sendMessage("message-public", { mode, message: formattedMessage });
    },
    [publicChatInstance, socket, viewer]
  );

  const handleClearChatClicked = useCallback(async () => {
    setLoadedMessages([]);
    await DataClient.clearPublicChatMessages(publicChatInstance.id);
  }, [publicChatInstance.id]);

  const handleSoundEnabledChanged = useCallback(
    (enabled: boolean) => setSoundEnabled(enabled),
    []
  );
  return (
    <ChatDisplay
      viewer={viewer}
      conversation={{ ...publicChatInstance, messages: loadedMessages }}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onNewMessage={handleNewMessage}
      onSoundEnabledChange={handleSoundEnabledChanged}
      soundEnabled={soundEnabled}
      answerPending={answerPending}
      soundPending={soundPending}
      // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-misused-promises
      onClearChatClicked={handleClearChatClicked}
    />
  );
}
