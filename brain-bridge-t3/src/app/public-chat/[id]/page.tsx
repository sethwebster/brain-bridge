import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import invariant from "tiny-invariant";

import { type Metadata } from "next";
import ServerData from "~/server/data";
import generateId from "~/utils/generate-id";
import { safeGetJSONCookieServer } from "~/utils/safe-get-json-cookie-server";
import { type PublicChatInstanceWithRelations } from "~/server/interfaces/types";
import PublicChat from "./components/PublicChat";
import { type PublicChat as PublicChatType } from "@prisma/client";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const chat = await ServerData.fetchPublicChat(id, true);
  if (chat) {
    return {
      title: `Chat: ${chat?.name}`,
    };
  } else {
    return {
      title: "Chat not found",
    };
  }
}


export default async function PublicChatPage({ params: { id } }: PageProps) {
  try {
    const chat = await ServerData.fetchPublicChat(id, true);
    ensurePublicChat(chat);
    invariant(chat, "Chat must exist");
    const userCookies = cookies();
    const viewerId = userCookies.get("viewer-id")?.value ?? generateId();
    const conversations = safeGetJSONCookieServer<{ [key: string]: string }>(
      "chats",
      {} as { [key: string]: string }
    );
    console.log("conversations", conversations);
    const conversationId = conversations[chat.id];
    console.log("conversationId", conversationId);
    let conversation: PublicChatInstanceWithRelations | undefined;
    if (conversationId) {
      try {
        conversation = await ServerData.fetchPublicChatInstance(conversationId);
      } catch (e) {
        console.log(`Chat for ${viewerId}/${conversationId} not found`, e);
      }
    }
    if (!conversation) {
      console.log("No conversation found cookies");
      try {
        const existing = await ServerData.fetchPublicChatInstanceForViewer(
          chat.id,
          viewerId
        );
        if (existing) {
          console.log("Existing convo");
          conversation = existing;
        }
      } catch (e) {
        console.log("Unable to fetch existing conversation", e);
      }
      if (!conversation) {
        console.log("creating new convo");
        conversation = await ServerData.newPublicChatInstance({
          participant: {
            id: viewerId,
            name: viewerId,
            type: "HUMAN",
            createdAt: new Date(),
            updatedAt: new Date(),
            conversationId: null,
            publicChatInstanceId: null,
          },
          publicChat: chat,
        });
      }
    }
    invariant(conversation, "Conversation must exist");
    return (
      <div className="h-full">
        <PublicChat
          publicChat={chat}
          publicChatInstance={conversation}
          viewer={{
            id: viewerId,
            name: viewerId,
            createdAt: new Date(),
            updatedAt: new Date(),
            type: "HUMAN",
            conversationId: null,
            publicChatInstanceId: conversation.id,
          }}
        />
      </div>
    );
  } catch (e) {
    console.log("Loading chat failed", e);
    notFound();
  }
}

function ensurePublicChat(chat: PublicChatType | undefined | null) {
  if (!chat) {
    notFound();
  }
}
