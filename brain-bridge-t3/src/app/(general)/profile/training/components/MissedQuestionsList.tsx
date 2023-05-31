import { useCallback, useState } from "react";
import Modal from "~/app/components/ModalDialog";
import { type TrainingSetWithRelations } from "~/server/interfaces/types";
import { AutoSizingTextArea } from "./AutoSizingTextArea";
import { type MissedQuestions } from "@prisma/client";

function MissedQuestion({ missed }: { missed: MissedQuestions }) {
  return (
    <div className="grid justify-between w-full grid-cols-2 border-b">
      <div className="col-span-1 p-2 text-left truncate">
        {missed.correctAnswer ? (
          <span className="inline-block mr-2 text-green-300">✓</span>
        ) : (
          <></>
        )}
        {missed.question}
      </div>
      <div className="flex-1 col-span-1 p-2 text-left truncate ">
        {missed.correctAnswer ?? missed.llmAnswer}
      </div>
    </div>
  );
}

export default function MissedQuestionsList({
  trainingSet,
  onUpdate,
}: {
  trainingSet: TrainingSetWithRelations;
  onUpdate?: (missedQuestions: MissedQuestions[]) => void;
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

  return (
    <>
      <div className="p-4 mt-2 rounded-lg">
        <h1 className="text-lg">Missed Questions</h1>
        <small>
          Missed questions are questions asked by users for which the model only
          had a low confidence (&lt;85%) in its answer.
        </small>
        <div className="p-2 border rounded-lg">
          {trainingSet.missedQuestions.length === 0 && (
            <small>No missed questions yet.</small>
          )}
          <ul className="w-full">
            {trainingSet.missedQuestions.map((missedQuestion) => (
              <li key={missedQuestion.id}>
                <button
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
              className="w-full h-32 p-2 border rounded-lg bg-slate-100 dark:bg-slate-400"
              value={selectedMissed?.correctAnswer || ""}
              onChange={handleTextAreaChange}
              autoFocus
            />
          </div>
          <div className="mt-2"></div>
        </div>
      </Modal>
    </>
  );
}
