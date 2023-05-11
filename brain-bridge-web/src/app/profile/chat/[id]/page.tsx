import Data from "@/utils/data";
import Chat from "../components/chat";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import { revalidatePath } from "next/cache";

export default async function Page({ params }: { params: { id: string } }) {
  "use server";
  const session = await getServerSession();
  if (!session) throw new Error("No session");
  const chats = await Data.fetchChats(session.user!.email!);
  const selectedChat = await Data.fetchChat(parseInt(params.id));
  console.log(selectedChat);
  // async function handleSubmit(data: FormData) {
  //   "use server";
  //   const session = await getServerSession();

  //   if (!data.get('id')) throw new Error("No chat ID");
  //   const id = parseInt(data.get('id') as string);
  //   Data.sendMessage(id, {
  //     sender: session!.user!.email!,
  //     text: data.get("message") as string,
  //     id: -1,
  //     timestamp: new Date().toISOString(),
  //   });
  //   // revalidatePath(`/profile/chat/${id}`);
  // }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-grow w-full h-full p-8">
        <input type="hidden" name="id" value={selectedChat.id} />
        <Chat selectedChat={selectedChat} chats={chats} />
      </div>
    </Suspense>
  );
}
