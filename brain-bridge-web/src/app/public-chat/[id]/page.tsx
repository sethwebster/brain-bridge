import PaddedContainer from "@/app/(general)/components/padded-container";
import Chat from "@/app/(general)/profile/chat/components/chat";
import ChatDisplay from "@/app/components/chat-display";
import Data from "@/utils/data";
import generateId from "@/utils/generate-id";
import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import PublicChat from "./components/public-chat";
import invariant from "tiny-invariant";

export default async function PublicChatPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { success, data: chat } = await Data.fetchPublicChat(id);
  ensurePublicChat(success, chat);
  invariant(chat, "Chat must exist");
  const userCookies = cookies();
  const viewerId = userCookies.get("viewer-id")?.value ?? generateId();
  const conversationId = userCookies.get("chat-id")?.value ?? generateId();
  let conversation: Conversation | undefined;
  try {
    conversation = await Data.fetchChat(conversationId);
  } catch (e) {
    console.log(`Chat for ${viewerId}/${conversationId} not found`, e);
  }
  if (!conversation) {
    conversation = await Data.newPublicChat(
      { id: viewerId, email: viewerId, name: viewerId },
      chat.trainingSetPath
    );
  }
  invariant(conversation, "Conversation must exist");
  return (
    <div className="h-full">
      <PublicChat
        publicChat={chat}
        viewer={{ id: viewerId }}
        conversation={conversation}
      />
    </div>
  );
}

PublicChatPage.getLayout = function getLayout(page: any) {
  return <>!!!{page}!!!</>;
};
function ensurePublicChat(success: boolean, chat: PublicChat | undefined) {
  if (!success || !chat) {
    notFound();
  }
}
