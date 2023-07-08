import invariant from "tiny-invariant";
import { getServerSession } from "~/server/auth";
import Chat from "../components/Chat";
import { Suspense } from "react";
import ServerData from "~/server/server-data";

async function PageContent({ id }: { id: string }) {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  invariant(session.user, "User must be logged in");
  const selectedChat = (await ServerData.fetchChat(id));
  return (
    <div className="flex w-full h-full">
      <input type="hidden" name="id" value={selectedChat.id} />
      <Chat selectedChat={selectedChat} session={session} />
    </div>
  );
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div></div>}>      
      <PageContent id={params.id} />
    </Suspense>
  );
}
