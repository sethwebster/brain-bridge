"use client";
import { type TrainingSetShares } from "@prisma/client";
import { useCallback, useMemo, useState } from "react";
import Input from "~/app/components/Input";
import Modal from "~/app/components/ModalDialog";
import { ShareIcon } from "~/app/components/SvgIcons";
import { type TrainingSetWithRelations } from "~/server/interfaces/types";
import { SaveIcon } from "./SvgIcons";
import invariant from "tiny-invariant";

export default function Shares({
  trainingSet,
  onConfirmChanges,
}: {
  trainingSet: TrainingSetWithRelations;
  onConfirmChanges: (trainingSetShares: TrainingSetShares[]) => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [shareData, setShareData] = useState<TrainingSetShares[]>(
    trainingSet.trainingSetShares
  );
  const [newEmailText, setNewEmailText] = useState("");

  const isDirty = useMemo(() => {
    return (
      JSON.stringify(shareData) !==
      JSON.stringify(trainingSet.trainingSetShares)
    );
  }, [shareData, trainingSet.trainingSetShares]);

  const handleShareButtonClick = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleNewEmailTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewEmailText(e.target.value);
    },
    []
  );

  const handleAddButtonClick = useCallback(() => {
    if (!newEmailText || newEmailText.trim().length === 0) {
      return;
    }
    if (shareData.find((s) => s.toUserEmail === newEmailText)) {
      return;
    }

    const updated = Array.from(shareData);
    updated.push({
      userId: trainingSet.userId,
      toUserEmail: newEmailText,
      trainingSetId: trainingSet.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      acceptedAt: null,
      acceptedByUser: false,
      acceptedUserId: null,
      id: "",
    });

    setShareData(updated);
    setNewEmailText("");
  }, [newEmailText, trainingSet, shareData]);

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      if (event.key === "Enter") {
        if (newEmailText.trim().length === 0) return;
        handleAddButtonClick();
      }
    },
    [handleAddButtonClick, newEmailText]
  );

  const handleConfirmChanges = useCallback(() => {
    onConfirmChanges(shareData);
    setModalOpen(false);
  }, [onConfirmChanges, shareData]);

  return (
    <>
      <button onClick={handleShareButtonClick}>
        <ShareIcon />
      </button>

      <Modal
        show={modalOpen}
        title="Sharing"
        confirmText={isDirty ? "Confirm Changes" : "Close"}
        closeText="Cancel"
        onConfirm={handleConfirmChanges}
        onCancel={() => setModalOpen(false)}
      >
        <h2>Share with</h2>
        <div className="flex w-full flex-row ">
          <Input
            type="email"
            placeholder="User email"
            className="mr-2 w-full flex-grow p-2"
            value={newEmailText}
            onChange={handleNewEmailTextChange}
            onKeyUp={handleKeyUp}
          />
          <button onClick={handleAddButtonClick}>
            <SaveIcon />
          </button>
        </div>
        <ul className="max-h-48 w-full overflow-scroll">
          {shareData.map((share) => (
            <li
              key={share.toUserEmail}
              className="mt-1 grid w-full grid-cols-12"
            >
              <div className="col-span-1">
                {share.acceptedByUser ? "✔" : "🕥"}
              </div>
              <div className="col-span-6 text-left">{share.toUserEmail}</div>
              <div className="col-span-4 text-right">Viewer</div>
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
}
