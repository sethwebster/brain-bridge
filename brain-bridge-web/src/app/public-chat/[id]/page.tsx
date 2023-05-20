import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import invariant from 'tiny-invariant';

import Data from '@/utils/data';
import generateId from '@/utils/generate-id';
import { safeGetJSONCookieServer } from '@/utils/safe-get-json-cookie-server';

import PublicChat from './components/PublicChat';

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
  const conversations = safeGetJSONCookieServer<{ [key: string]: string }>(
    "chats",
    {}
  );
  const conversationId = conversations[chat.id];
  let conversation: Conversation | undefined;
  if (conversationId) {
    try {
      conversation = await Data.fetchChat(conversationId);
    } catch (e) {
      console.log(`Chat for ${viewerId}/${conversationId} not found`, e);
    }
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

function ensurePublicChat(success: boolean, chat: PublicChat | undefined) {
  console.log("ensurePublicChat", "success", success, "chat", chat);
  if (!success || !chat) {
    notFound();
  }
}
