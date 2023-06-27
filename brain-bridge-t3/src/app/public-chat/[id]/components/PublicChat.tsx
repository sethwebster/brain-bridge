"use client";
import { type Participant, type PublicChat } from "@prisma/client";
import { setCookie } from "cookies-next";
import { useCallback, useEffect, useState } from "react";
import ChatDisplay, { type NewMessage } from "~/app/components/ChatDisplay";
import {
  type ChatResponseMode,
  type MessageWithRelations,
  type PublicChatInstanceWithRelations,
} from "~/data/interfaces/types";
import DataClient from "~/utils/data-client";
import generateId from "~/utils/generate-id";
import { safeGetJSONCookieClient } from "~/utils/safe-get-json-cookie-client";
import useSocket from "~/hooks/use-socket";
import generateChatErrorMessage from "~/utils/error-chat-message-generator";
import { useSession } from "next-auth/react";
import { CheckLogin } from "~/app/login/CheckLogin";
import { useAuthToken } from "~/hooks/useAuthToken";

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
  const [callback, setCallback] = useState<(() => void) | null>(null);
  const session = useSession();
  // const player = useAudioPlayer();
  const socket = useSocket();
  const { token } = useAuthToken();

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
      // if (token) socket.join(publicChatInstance.id, "private");
      // const leaveRoom = () => {
      //   if (!token) return;
      //   socket.leave(publicChatInstance.id, "private");
      // };

      const removeMessageListener = socket.onMessage(
        "message",
        (payload: { message: MessageWithRelations }) => {
          setAnswerPending(false);
          setLoadedMessages((messages) => [...messages, payload.message]);
          callback?.();
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
          setAnswerPending(false);
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
  }, [callback, publicChatInstance.id, socket, token]);

  // const playVoice = useCallback(
  //   (fileUrl: string) => {
  //     player.play(fileUrl);
  //   },
  //   [player]
  // );
  const handleNewMessage = useCallback(
    (newMessage: NewMessage, mode: ChatResponseMode) => {
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
      socket.sendMessage("message", { mode, message: formattedMessage });
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

  const handleNotifyCallbackSet = useCallback((callback: () => void) => {
    setCallback(callback);
  }, []);
  return (
    <>
      {!session ||
        (session.status != "authenticated" && (
          <CheckLogin provider="anonymous" />
        ))}
      <div className="w-full h-auto min-h-full overflow-scroll bg-slate-100 dark:bg-slate-700">
        <ChatDisplay
          chatType="public"
          isConnected={socket.status === "authenticated" ?? false}
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
          notifyNewMessage={handleNotifyCallbackSet}
        />
      </div>
    </>
  );
}
