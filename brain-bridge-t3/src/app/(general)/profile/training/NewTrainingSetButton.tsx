"use client";
import { useCallback, useState } from "react";
import Input from "~/app/components/Input";
import Modal from "~/app/components/ModalDialog";
import { NewButton } from "~/app/components/NewButton";
import DataClient from "~/utils/data-client";
import promptTemplate from "./PromptTemplate";
import { useRouter } from "next/navigation";
import { defaultTrainingOptions } from "~/server/interfaces/types";

interface NewTrainingSetButtonProps {
  empty?: boolean;
}
export function NewTrainingSetButton({}: NewTrainingSetButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const router = useRouter();
  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  const handleConfirmCreate = useCallback(async () => {
    const result = await DataClient.createTrainingSet({
      id: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      name: inputValue,
      conversations: [],
      prompt: promptTemplate,
      questionsAndAnswers: [],
      trainingSources: [],
      version: 0,
      userId: "",
      trainingIndexId: "",
      missedQuestions: [],
      trainingSetShares: [],
      useOwnPrompt: false,
      trainingOptions: defaultTrainingOptions,
      trainingStatus: "IDLE"
    });
    router.push("/profile/training/" + result.id);
  }, [inputValue, router]);

  return (
    <>
      <NewButton onClick={() => setIsOpen(true)} />
      <Modal
        title="New Training Set"
        show={isOpen}
        closeText="Cancel"
        confirmText="Create"
        onCancel={() => setIsOpen(false)}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onConfirm={handleConfirmCreate}
      >
        <Input
          className="w-full p-2"
          placeholder="Name of training set"
          value={inputValue}
          onChange={handleTextChange}
          type="text"
        />
      </Modal>
    </>
  );
}
