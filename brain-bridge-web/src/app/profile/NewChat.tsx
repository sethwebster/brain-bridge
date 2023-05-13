"use client"
import Data from "@/utils/data";
import { useRouter } from "next/navigation";

export function NewChat({
  user,
}: {
  user: { email?: string | null | undefined; name?: string | null | undefined; };
}) {
  const router = useRouter();
  const handleNewChat = async () => {
    const newChat = await Data.newChat(user);
    router.push(`/profile/chat/${newChat.id}`);
  };
  return (
    <button
      className="p-2 text-white bg-blue-400 rounded-md"
      onClick={handleNewChat}
    >
      New Chat
    </button>
  );
}
