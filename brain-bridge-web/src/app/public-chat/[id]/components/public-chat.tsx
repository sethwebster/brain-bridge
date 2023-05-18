"use client";
import ChatDisplay from "@/app/components/chat-display";
import Data from "@/utils/data";
import { useCallback, useState, useEffect } from "react";
import { setCookie } from "cookies-next";

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

  useEffect(() => {
    setCookie("viewer-id", viewer.id, { sameSite: "strict" });
    setCookie("chat-id", conversation.id, { sameSite: "strict" });
  }, [conversation.id, viewer.id]);

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

        // playVoice(voice.file);
      }
      // bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    },
    [conversation.id, soundEnabled]
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
