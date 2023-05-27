"use client";

import { type User } from "@prisma/client";
import {
  type ConversationWithRelations,
  type MessageWithRelations,
} from "~/interfaces/types";
import { type Session } from "next-auth";
import { useCallback, useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import ChatDisplay from "~/app/components/ChatDisplay";
// import useAudioPlayer from "~/hooks/useAudioPlayer";
import DataClient from "~/utils/data-client";
import generateId from "~/utils/generate-id";

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

  // const playVoice = useCallback(
  //   (fileUrl: string) => {
  //     player.play(fileUrl);
  //   },
  //   [player]
  // );

  const getLLMResponse = useCallback(
    async (message: MessageWithRelations) => {
      setAnswerPending(true);
      try {
        const llmResponse = await DataClient.sendMessage(message);
        setAnswerPending(false);
        invariant(llmResponse, "No data in response");
        const messageResponse = llmResponse;
        setSelectedChatMessages((messages) => [...messages, messageResponse]);
        // if (soundEnabled) {
        //   setSoundPending(true);
        //   const voice = await Data.getVoiceMessage(
        //     selectedChat.id,
        //     llmResponse.data
        //   );
        //   setSoundPending(false);

        //   playVoice(voice.file);
        // }
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      } catch (e) {
        setSelectedChatMessages((messages) => [
          ...messages,
          {
            id: Date.now().toString(),
            text: "⛔️ So sorry! I've failed to get a response for this message. This is likely due to an error on the server. We are working on fixing this.",
            sender: {
              id: "system",
              name: "System",
              conversationId: selectedChat.id,
              createdAt: new Date(),
              updatedAt: new Date(),
              type: "BOT",
            },
            participantId: "system",
            timestamp: new Date().toISOString(),
            createdAt: new Date(),
            conversation: selectedChat,
            conversationId: selectedChat.id,
          },
        ]);
      } finally {
        setAnswerPending(false);
      }
    },

    [selectedChat]
  );

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [firstLoad, getLLMResponse, session.user?.email, session.user?.name]);

  const handleSend = useCallback(
    async (newMessage: MessageWithRelations) => {
      const sendMessage = async () => {
        setSelectedChatMessages((messages) => [
          ...messages,
          { ...newMessage, id: generateId() },
        ]);
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        await getLLMResponse(newMessage);
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      };
      await sendMessage();
    },
    [getLLMResponse]
  );

  const handleClearChatClicked = useCallback(() => {
    setSelectedChatMessages([]);
    DataClient.clearChat(selectedChat.id).catch((e)=>{
      console.log(e);
    })
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
      viewer={session.user as User}
      onClearChatClicked={handleClearChatClicked}
    />
  );
}
