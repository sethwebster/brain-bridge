import Data from "@/utils/data";
import Chat from "../components/Chat";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import invariant from "tiny-invariant";

async function PageContent({ id }: { id: string }) {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  invariant(session.user, "User must be logged in");
  const chats = await Data.fetchChats({ email: session.user.email! });
  const selectedChat = (await Data.fetchChat(id)) as Conversation;
  console.log(selectedChat)
  return (
    <div className="flex w-full h-full">
      <input type="hidden" name="id" value={selectedChat.id} />
      <Chat selectedChat={selectedChat} session={session} />
    </div>
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div></div>}>
      {/* @ts-expect-error RSC */}
      <PageContent id={params.id} />
    </Suspense>
  );
}
