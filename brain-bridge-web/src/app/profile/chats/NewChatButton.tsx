"use client";
import Data from "@/utils/data";
import { useRouter } from "next/navigation";
import { NewButton } from "../../components/NewButton";

export function NewChatButton({
  user,
}: {
  user: { email?: string | null | undefined; name?: string | null | undefined };
}) {
  const router = useRouter();
  const handleNewChat = async () => {
    const newChat = await Data.newChat(user);
    router.push(`/profile/chat/${newChat.id}`);
  };
  return <NewButton onClick={handleNewChat} />;
}
