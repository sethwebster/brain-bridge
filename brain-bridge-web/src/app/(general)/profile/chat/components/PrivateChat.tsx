"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ChatDisplay from "@/app/components/ChatDisplay";
import Data from "@/utils/data";
import { Session } from "next-auth";
import useAudioPlayer from "@/hooks/useAudioPlayer";
import invariant from "tiny-invariant";

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
      setAnswerPending(false);
      if (llmResponse.success) {
        invariant(llmResponse.data, "No data in response");
        const message = llmResponse.data;
        setSelectedChatMessages((messages) => [...messages, message]);
        if (soundEnabled) {
          setSoundPending(true);
          const voice = await Data.getVoiceMessage(
            selectedChat.id,
            llmResponse.data
          );
          setSoundPending(false);

          playVoice(voice.file);
        }
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      } else {
        setSelectedChatMessages((messages) => [
          ...messages,
          {
            id: Date.now(),
            text: "⛔️ So sorry! I've failed to get a response for this message. This is likely due to an error on the server. We are working on fixing this.",
            sender: "error",
            timestamp: new Date().toISOString(),
          },
        ]);
      }
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
