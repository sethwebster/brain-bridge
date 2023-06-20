"use client";
import AutoSizingTextArea from "./AutoSizingTextArea";
import { type TrainingSetWithRelations } from "~/data/interfaces/types";
import { AutoTraining } from "./AutoTraining";

export function PromptTab({
  trainingSetData,
  isAutoTraining,
  handlePromptChange,
  onPromptGenerated,
  onAutoTrainClicked,
}: {
  canEdit: boolean;
  isAutoTraining: boolean;
  trainingSetData: TrainingSetWithRelations;
  handlePromptChange: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onPromptGenerated: (prompt: string) => void;
  onAutoTrainClicked: () => void;
}) {
  return (
    <div className="h-auto p-2 px-4">
      {!isAutoTraining && (
        <div className="mt-2">
          <button
            className="rounded bg-blue-500 p-2 text-blue-100 shadow"
            onClick={onAutoTrainClicked}
          >
            {trainingSetData.prompt.trim().length > 0
              ? "Refine Prompt with Help"
              : "Generate Prompt"}
          </button>
        </div>
      )}
      {isAutoTraining && (
        <div className="mt-2">
          <button
            className="rounded bg-amber-500 p-2 text-amber-100 shadow"
            onClick={onAutoTrainClicked}
          >
            Cancel
          </button>
        </div>
      )}
      {isAutoTraining && (
        <AutoTraining
          onPromptGenerated={onPromptGenerated}
          oldPrompt={trainingSetData.prompt}
        />
      )}
      {!isAutoTraining && (
        <AutoSizingTextArea
          className="mt-2 h-screen w-full rounded-md border p-2 dark:border-slate-600 dark:bg-slate-700"
          placeholder="Prompt"
          name="prompt"
          value={trainingSetData.prompt}
          onChange={handlePromptChange}
          maxHeight={800}
        />
      )}
    </div>
  );
}
