"use client";
import { memo } from "react";
import { type TrainingSetRoles, type TrainingSetShares } from "@prisma/client";
import { useCallback, useMemo, useState } from "react";
import Input from "~/app/components/Input";
import Modal from "~/app/components/ModalDialog";
import { ShareIcon } from "~/app/components/SvgIcons";
import { type TrainingSetWithRelations } from "~/data/interfaces/types";
import { SaveIcon, TrashCan } from "~/app/components/SvgIcons";
import Select from "~/app/components/Select";
import ConfirmButton from "~/base-components/ConfirmButton";

function Shares({
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
      role: "VIEWER",
      invitationSentAt: null,
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

  const handleShareRoleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>, share: TrainingSetShares) => {
      const updated = shareData.map((s) => {
        if (s.toUserEmail === share.toUserEmail) {
          return { ...s, role: event.target.value as TrainingSetRoles };
        }
        return s;
      });
      setShareData(updated);
    },
    [shareData]
  );

  const handleRemoveShare = useCallback(
    (share: TrainingSetShares) => {
      const updated = shareData.filter(
        (s) => s.toUserEmail !== share.toUserEmail
      );
      setShareData(updated);
    },

    [shareData]
  );

  return (
    <div>
      <div>
        <button
          onClick={handleShareButtonClick}
          className="relative rounded bg-blue-400 p-2 shadow"
        >
          <ShareIcon />
          <div className="absolute -right-2 -top-2 inline-flex h-4 w-4 items-center justify-center rounded-full   bg-red-500 text-xs font-bold text-white dark:border-gray-900">
            {shareData.length}
          </div>
        </button>
      </div>
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
              <div className="col-span-4 text-left">{share.toUserEmail}</div>
              <div className="col-span-5 text-right">
                <Select
                  value={share.role}
                  className="p-1 focus:border-0"
                  onChange={(e) => {
                    handleShareRoleChange(e, share);
                  }}
                >
                  <option value="VIEWER">Viewer</option>
                  <option value="EDITOR">Editor</option>
                </Select>
              </div>
              <ConfirmButton
                onConfirmed={() => handleRemoveShare(share)}
                className="flex h-8 w-8 flex-row items-center justify-center rounded border-green-800 bg-blue-400 bg-opacity-50 hover:bg-opacity-90 "
                confirmingClassName="flex flex-row items-center justify-center w-8 h-8 bg-red-400 bg-opacity-50 border-green-800 rounded hover:bg-opacity-90 "
              >
                <TrashCan />
              </ConfirmButton>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}

export default memo(Shares);
