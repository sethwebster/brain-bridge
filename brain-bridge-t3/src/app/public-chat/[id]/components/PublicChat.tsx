"use client";
import {
  type Participant,
  type PublicChat,
} from "@prisma/client";
import { setCookie } from "cookies-next";
import { useCallback, useEffect, useState } from "react";
import ChatDisplay, { type NewMessage } from "~/app/components/ChatDisplay";
import {
  type ChatResponseMode,
  type MessageWithRelations,
  type PublicChatInstanceWithRelations,
} from "~/interfaces/types";
import DataClient from "~/utils/data-client";
import generateId from "~/utils/generate-id";
import { safeGetJSONCookieClient } from "~/utils/safe-get-json-cookie-client";

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

  useEffect(() => {
    setCookie("viewer-id", viewer.id, { sameSite: "strict" });
    const userChats = safeGetJSONCookieClient<{ [k: string]: string }>(
      "chats",
      {}
    ) as { [k: string]: string };
    userChats[publicChat.id] = publicChatInstance.id;
    setCookie("chats", JSON.stringify(userChats), { sameSite: "strict" });
  }, [publicChat.id, publicChatInstance.id, viewer.id]);

  // const playVoice = useCallback(
  //   (fileUrl: string) => {
  //     player.play(fileUrl);
  //   },
  //   [player]
  // );

  const getLLMResponse = useCallback(async (message: MessageWithRelations, mode: ChatResponseMode) => {
    setAnswerPending(true);
    console.log("NEW MESSAGE", message);
    const llmResponse = await DataClient.sendPublicInstanceChatMessage(message, mode);
    setAnswerPending(false);
    console.log("llmResponse", llmResponse);
    if (llmResponse) {
      const message = llmResponse;
      setLoadedMessages((messages) => [...messages, message]);
      // if (soundEnabled) {
      //   setSoundPending(true);
      //   const voice = await Data.getVoiceMessage(
      //     conversation.id,
      //     llmResponse.data
      //   );
      //   setSoundPending(false);

      //   playVoice(voice.file);
      // }
    } else {
      setLoadedMessages((messages) => [
        ...messages,
        {
          id: Date.now().toString(),
          text: "⛔️ So sorry! I've failed to get a response for this message. This is likely due to an error on the server. We are working on fixing this.",
          createdAt: new Date(),
          conversationId: "",
          participantId: "system",
          publicChatInstanceId: "",
          conversation: null,
          publicChatInstance: null,
          sender: {
            id: "system",
            name: "System",
            conversationId: "",
            createdAt: new Date(),
            updatedAt: new Date(),
            publicChatInstanceId: "",
            type: "BOT",
          },

        },
      ]);
    }
    // bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleNewMessage = useCallback(
    async (newMessage: NewMessage, mode: ChatResponseMode) => {
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
        publicChatInstanceId: publicChat.id,
        participantId: viewer.id,
      };
      setLoadedMessages((messages) => [...messages, formattedMessage]);
      await getLLMResponse(formattedMessage, mode);
    },
    [getLLMResponse, publicChat.id, publicChatInstance, viewer]
  );

    const handleClearChatClicked = useCallback(async () => {
      setLoadedMessages([]);
      await DataClient.clearPublicChatMessages(publicChatInstance.id)
    }, [publicChatInstance.id]);
  
  const handleSoundEnabledChanged = useCallback(
    (enabled: boolean) => setSoundEnabled(enabled),
    []
  );
  return (
    <ChatDisplay
      viewer={viewer}
      conversation={{...publicChatInstance, messages: loadedMessages}}
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
