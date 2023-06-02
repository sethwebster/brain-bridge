"use client";
import { memo } from "react";
import { type TrainingSetShares } from "@prisma/client";
import { useCallback, useMemo, useState } from "react";
import Input from "~/app/components/Input";
import Modal from "~/app/components/ModalDialog";
import { ShareIcon } from "~/app/components/SvgIcons";
import { type TrainingSetWithRelations } from "~/server/interfaces/types";
import { SaveIcon, TrashCan } from "./SvgIcons";
import Select from "~/app/components/Select";
import DeleteButton from "../../components/DeleteButton";

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
    console.log("isDirtyCheck");
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

  console.log("shareData", shareData);

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
          return { ...s, role: event.target.value as "EDITOR" | "VIEWER" };
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
        <div className="flex flex-row w-full ">
          <Input
            type="email"
            placeholder="User email"
            className="flex-grow w-full p-2 mr-2"
            value={newEmailText}
            onChange={handleNewEmailTextChange}
            onKeyUp={handleKeyUp}
          />
          <button onClick={handleAddButtonClick}>
            <SaveIcon />
          </button>
        </div>
        <ul className="w-full overflow-scroll max-h-48">
          {shareData.map((share) => (
            <li
              key={share.toUserEmail}
              className="grid w-full grid-cols-12 mt-1"
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
              <DeleteButton
                onConfirmed={() => handleRemoveShare(share)}
                className="flex flex-row items-center justify-center w-8 h-8 bg-blue-400 bg-opacity-50 border-green-800 rounded hover:bg-opacity-90 "
                confirmingClassName="flex flex-row items-center justify-center w-8 h-8 bg-red-400 bg-opacity-50 border-green-800 rounded hover:bg-opacity-90 "
              >
                <TrashCan />
              </DeleteButton>
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
}

export default memo(Shares);
