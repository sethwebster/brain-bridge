"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ChatDisplay from "@/app/components/ChatDisplay";
import Data from "@/utils/data";
import { Session } from "next-auth";
import useAudioPlayer from "@/hooks/useAudioPlayer";

export default function Chat({
  selectedChat,
  session,
}: {
  selectedChat: Conversation;
  session: Session;
}) {
  const [firstLoad, setFirstLoad] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundPending, setSoundPending] = useState(false);
  const [answerPending, setAnswerPending] = useState(false);
  const player = useAudioPlayer();
  const [selectedChatMessages, setSelectedChatMessages] = useState(
    selectedChat.messages
  );
  const bottomRef = useRef<HTMLDivElement>(null);

  const playVoice = useCallback(
    (fileUrl: string) => {
      player.play(fileUrl);
    },
    [player]
  );

  const getLLMResponse = useCallback(
    async (message: Message) => {
      setAnswerPending(true);
      const llmResponse = await Data.sendMessage(selectedChat.id, message);
      setSelectedChatMessages((messages) => [...messages, llmResponse]);
      setAnswerPending(false);
      if (soundEnabled) {
        setSoundPending(true);
        const voice = await Data.getVoiceMessage(selectedChat.id, llmResponse);
        setSoundPending(false);

        playVoice(voice.file);
      }
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    },
    [playVoice, selectedChat.id, soundEnabled]
  );

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });      
    }
  }, [firstLoad, getLLMResponse, session.user?.email, session.user?.name]);

  const handleSend = useCallback(
    (newMessage: Message) => {
      const sendMessage = async () => {
        setSelectedChatMessages((messages) => [
          ...messages,
          { ...newMessage, id: selectedChatMessages.length + 1 },
        ]);
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        await getLLMResponse(newMessage);
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      };
      sendMessage();
    },
    [getLLMResponse, selectedChatMessages.length]
  );

  if (!session.user?.email) throw new Error("No user email");
  return (
    <ChatDisplay
      answerPending={answerPending}
      soundPending={soundPending}
      loadedMessages={selectedChatMessages}
      onNewMessage={handleSend}
      soundEnabled={soundEnabled}
      onSoundEnabledChange={(value) => setSoundEnabled(value)}
      viewer={{ id: session.user?.name ?? session.user?.email }}
    />
  );
}
