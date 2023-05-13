"use client";
import Data from "@/utils/data";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export function DeleteChat({
  id,
  user,
}: {
  id: string;
  user: { email?: string | null | undefined; name?: string | null | undefined };
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const handleDeleteChat = useCallback(async () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    const newChat = await Data.deleteChat(id, user as any);
    router.refresh();
  }, [confirming, id, router, user]);
  const handleBlur = useCallback(() => {
    setConfirming(false);
  }, []);
  return (
    <button
      className={`p-2 text-white bg-blue-400  rounded-md ${
        confirming ? "bg-red-400" : "bg-green-400"
      }}`}
      onClick={handleDeleteChat}
      onBlur={handleBlur}
    >
      {confirming ? "Confirm" : "Delete"}
    </button>
  );
}
