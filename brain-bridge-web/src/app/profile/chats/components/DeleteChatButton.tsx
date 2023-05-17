"use client";
import DeleteButton from "@/app/components/delete-button";
import Data from "@/utils/data";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { TrashCan } from "../../training/new/components/svg-icons";

export function DeleteChat({
  id,
  user,
}: {
  id: string;
  user: { email?: string | null | undefined; name?: string | null | undefined };
}) {
  const router = useRouter();
  
  const handleDeleteChatConfirmed = useCallback(async () => {
    await Data.deleteChat(id, user as any);
    router.refresh();
  }, [id, router, user]);
  
  return (
    <DeleteButton
      className="p-2 bg-blue-400 rounded-md"
      confirmingClassName="p-2 bg-red-400 rounded-md"
      onConfirmed={handleDeleteChatConfirmed}
    >
      <TrashCan />
    </DeleteButton>
  );
}
