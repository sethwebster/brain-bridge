"use client";
import { QuestionsWizard } from "./QuestionsWizard";
import { AutoSizingTextArea } from "./AutoSizingTextArea";
import {
  type QuestionAndAnswerPartial,
  type TrainingSetWithRelations
} from "~/server/interfaces/types";
import { InfoBoxDisplay } from "~/app/components/InfoBox";
import Toggle from "~/app/components/toggle";

export function PromptTab({ allQuestionsAnswered, canEdit, trainingSetData, handleUseOwnPromptToggle, handleQnAChange, handlePromptChange }: {
  allQuestionsAnswered: boolean;
  canEdit: boolean;
  trainingSetData: TrainingSetWithRelations;
  handleUseOwnPromptToggle: (useOwnPrompt: boolean) => void;
  handleQnAChange: (questionsAndTokens: QuestionAndAnswerPartial[]) => void;
  handlePromptChange: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="h-auto p-2 px-4">
      {!allQuestionsAnswered && (
        <InfoBoxDisplay
          hidden={false}
          handleDismiss={() => {
            console.log("dismiss");
          }}
          title="Questions and Answers"
          body="You need to answer all questions before you can save or train."
          dismissable={false} />
      )}
      <div className="mt-2">
        <Toggle
          disabled={!canEdit}
          value={trainingSetData.useOwnPrompt}
          label="Use custom prompt"
          onChange={handleUseOwnPromptToggle} />
      </div>
      {!trainingSetData.useOwnPrompt && (
        <QuestionsWizard
          disabled={!canEdit}
          onStateChange={handleQnAChange}
          questionsAndTokens={trainingSetData.questionsAndAnswers} />
      )}
      {trainingSetData.useOwnPrompt && (
        <AutoSizingTextArea
          className="mt-2 h-screen w-full rounded-md border p-2 dark:border-slate-600 dark:bg-slate-700"
          placeholder="Prompt"
          name="prompt"
          value={trainingSetData.prompt}
          onChange={handlePromptChange}
          disabled={!trainingSetData.useOwnPrompt}
          maxHeight={800} />
      )}
    </div>
  );
}
