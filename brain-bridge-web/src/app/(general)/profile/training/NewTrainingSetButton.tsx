"use client";
import { useCallback, useState } from "react";
import Input from "~/app/components/Input";
import Modal from "~/app/components/ModalDialog";
import DataClient from "~/utils/data-client";
import promptTemplate from "./DEPRECATED_PromptTemplate";
import { useRouter } from "next/navigation";
import { defaultTrainingOptions } from "~/data/interfaces/types";
import NewButton from "~/app/components/NewButton";

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
      missedQuestions: [],
      trainingSetShares: [],
      trainingOptions: defaultTrainingOptions,
      trainingStatus: "IDLE",
      trainingIndexVersion: 0,
      publicChats: [],
      usage: []
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
