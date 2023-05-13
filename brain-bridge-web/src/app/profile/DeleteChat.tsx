"use client"
import Data from "@/utils/data";
import { useRouter } from "next/navigation";

export function DeleteChat({
  id,
  user,
}: {
  id: string,
  user: { email?: string | null | undefined; name?: string | null | undefined; };
}) {
  const router = useRouter();
  const handleDeleteChat = async () => {
    const newChat = await Data.deleteChat(id, user as any);
    router.push(`/profile`);
  };
  return (
    <button
      className="p-2 text-white bg-blue-400 rounded-md"
      onClick={handleDeleteChat}
    >
      delete
    </button>
  );
}
