"use client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import DataClient from "~/utils/data-client";
import DeleteButton from "~/base-components/DeleteButton";

export function DeleteChat({
  id,
}: {
  id: string;
  user: { email?: string | null | undefined; name?: string | null | undefined };
}) {
  const router = useRouter();

  const handleDeleteChatConfirmed = useCallback(async () => {
    await DataClient.deleteChat(id);
    router.refresh();
  }, [id, router]);

  return <DeleteButton onConfirmed={() => void handleDeleteChatConfirmed()} />;
}
