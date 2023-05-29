"use client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { TrashCan } from "../../training/components/SvgIcons";
import DataClient from "~/utils/data-client";
import DeleteButton from "../../components/DeleteButton";

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
  
  return (
    <DeleteButton
      className="p-2 bg-blue-400 rounded-md"
      confirmingClassName="p-2 bg-red-400 rounded-md"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onConfirmed={handleDeleteChatConfirmed}
    >
      <TrashCan />
    </DeleteButton>
  );
}
