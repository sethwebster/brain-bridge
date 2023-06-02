import { useCallback, useState } from "react";
import Modal from "~/app/components/ModalDialog";
import { type TrainingSetWithRelations } from "~/server/interfaces/types";
import { AutoSizingTextArea } from "./AutoSizingTextArea";
import { type MissedQuestions } from "@prisma/client";
import Toggle from "~/app/components/toggle";

function MissedQuestion({ missed }: { missed: MissedQuestions }) {
  return (
    <div className="grid w-full grid-cols-2 justify-between border-b">
      <div className="col-span-1 truncate p-2 text-left">
        {!missed.ignored && missed.correctAnswer && (
          <span className="mr-2 inline-block text-green-300">✓</span>
        )}
        {missed.ignored && (
          <span className="mr-2 inline-block text-red-300 opacity-60 ">❌</span>
        )}
        <span className={`${missed.ignored ? "line-through" : ""}`}>
          {missed.question}
        </span>
      </div>
      <div className="col-span-1 flex-1 truncate p-2 text-left ">
        <span className={`${missed.ignored ? "line-through" : ""}`}>
          {missed.correctAnswer ?? missed.llmAnswer}
        </span>
      </div>
    </div>
  );
}

export default function MissedQuestionsList({
  trainingSet,
  onUpdate,
  disabled,
}: {
  trainingSet: TrainingSetWithRelations;
  onUpdate?: (missedQuestions: MissedQuestions[]) => void;
  disabled?: boolean;
}) {
  const [selectedMissed, setSelectedMissed] =
    useState<MissedQuestions | null>();

  const handleTextAreaChange = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!selectedMissed) return;
      const val = evt.target?.value;
      setSelectedMissed({ ...selectedMissed, correctAnswer: val ?? "" });
    },
    [selectedMissed]
  );

  const handleConfirmUpdate = useCallback(() => {
    if (!selectedMissed) return;
    const newMissedQuestions = trainingSet.missedQuestions.map((missed) =>
      missed.id === selectedMissed.id ? selectedMissed : missed
    );
    onUpdate?.(newMissedQuestions);
    setSelectedMissed(null);
  }, [selectedMissed, trainingSet.missedQuestions, onUpdate]);

  const handleToggleIgnore = useCallback(
    (ignored: boolean) => {
      if (!selectedMissed) return;
      const newMissedQuestions = trainingSet.missedQuestions.map((missed) =>
        missed.id === selectedMissed.id ? { ...missed, ignored } : missed
      );
      onUpdate?.(newMissedQuestions);
      setSelectedMissed(null);
    },
    [selectedMissed, trainingSet.missedQuestions, onUpdate]
  );

  return (
    <>
      <div className="mt-2 rounded-lg py-4">
        <h1 className="text-lg">Missed Questions</h1>
        <small>
          Missed questions are questions asked by users for which the model only
          had a low confidence (&lt;85%) in its answer.
        </small>
        <div className="rounded-lg border p-2">
          {trainingSet.missedQuestions.length === 0 && (
            <small>No missed questions yet.</small>
          )}
          <ul className="w-full">
            {trainingSet.missedQuestions
              .filter((q) => q.question.trim().length > 0)
              .map((missedQuestion) => (
                <li key={missedQuestion.id}>
                  <button
                    disabled={disabled}
                    onClick={() => setSelectedMissed(missedQuestion)}
                    className="flex flex-row"
                  >
                    <MissedQuestion missed={missedQuestion} />
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <Modal
        title="Answer a missed question"
        closeText="Cancel"
        confirmText="Answer"
        show={!!selectedMissed}
        onConfirm={handleConfirmUpdate}
        onCancel={() => setSelectedMissed(null)}
      >
        <div className="p-4">
          <div className="text-lg text-slate-700">
            {selectedMissed?.question}
          </div>
          <div className="mt-2">
            <AutoSizingTextArea
              disabled={selectedMissed?.ignored}
              className="h-32 w-full rounded-lg border bg-slate-100 p-2 dark:bg-slate-400"
              value={selectedMissed?.correctAnswer || ""}
              onChange={handleTextAreaChange}
              autoFocus
            />
          </div>
          <Toggle
            label="Ignore"
            value={selectedMissed?.ignored ?? false}
            onChange={handleToggleIgnore}
          />
          <div className="mt-2"></div>
        </div>
      </Modal>
    </>
  );
}
