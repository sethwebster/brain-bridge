"use client";
import { setCookie } from "cookies-next";
import { useCallback, useEffect, useState } from "react";

import ChatDisplay from "@/app/components/ChatDisplay";
import Data from "@/utils/data";
import { safeGetJSONCookieClient } from "@/utils/safe-get-json-cookie-client";
import useAudioPlayer from "@/hooks/useAudioPlayer";

interface PublicChatProps {
  viewer: Viewer;
  publicChat: PublicChat;
  conversation: Conversation;
}
export default function PublicChat({
  viewer,
  publicChat,
  conversation,
}: PublicChatProps) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [answerPending, setAnswerPending] = useState(false);
  const [soundPending, setSoundPending] = useState(false);
  const [loadedMessages, setLoadedMessages] = useState<Message[]>(
    conversation.messages
  );
  const player = useAudioPlayer();

  useEffect(() => {
    setCookie("viewer-id", viewer.id, { sameSite: "strict" });
    const userChats = safeGetJSONCookieClient("chats", {});
    console.log("TUC", userChats);
    userChats[publicChat.id] = conversation.id;
    setCookie("chats", JSON.stringify(userChats), { sameSite: "strict" });
  }, [conversation.id, publicChat.id, viewer.id]);

  const playVoice = useCallback(
    (fileUrl: string) => {
      player.play(fileUrl);
    },
    [player]
  );

  const getLLMResponse = useCallback(
    async (message: Message) => {
      setAnswerPending(true);
      const llmResponse = await Data.sendMessage(conversation.id, message);
      setLoadedMessages((messages) => [...messages, llmResponse]);
      setAnswerPending(false);
      if (soundEnabled) {
        setSoundPending(true);
        const voice = await Data.getVoiceMessage(conversation.id, llmResponse);
        setSoundPending(false);

        playVoice(voice.file);
      }
      // bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    },
    [conversation.id, playVoice, soundEnabled]
  );

  const handleNewMessage = useCallback(
    async (newMessage: Message) => {
      setAnswerPending(true);
      setLoadedMessages((messages) => [
        ...messages,
        { ...newMessage, id: loadedMessages.length + 1 },
      ]);
      await getLLMResponse(newMessage);
    },
    [getLLMResponse, loadedMessages.length]
  );
  const handleSoundEnabledChanged = useCallback(
    (enabled: boolean) => setSoundEnabled(enabled),
    []
  );
  return (
    <ChatDisplay
      viewer={viewer}
      loadedMessages={loadedMessages}
      onNewMessage={handleNewMessage}
      onSoundEnabledChange={handleSoundEnabledChanged}
      soundEnabled={soundEnabled}
      answerPending={answerPending}
      soundPending={soundPending}
    />
  );
}
