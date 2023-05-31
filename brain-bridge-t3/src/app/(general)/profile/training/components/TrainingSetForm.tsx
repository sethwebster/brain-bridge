"use client";

import { useCallback, useMemo, useState } from "react";
import { QuestionsWizard } from "./QuestionsWizard";
import Sources from "./Sources";
import Data from "~/utils/data-client";
import { useRouter } from "next/navigation";
import { AutoSizingTextArea } from "./AutoSizingTextArea";
import Input from "~/app/components/Input";
import ErrorBox from "~/app/components/ErrorBox";
import {
  type MissedQuestions,
  type QuestionAndAnswer,
  type TrainingSource,
} from "@prisma/client";
import {
  type QuestionAndAnswerPartial,
  type TrainingSetWithRelations,
} from "~/server/interfaces/types";
import { InfoBoxDisplay } from "~/app/components/InfoBox";
import replaceTokens from "~/utils/replace-tokens";
import MissedQuestionsList from "./MissedQuestionsList";

interface TrainingSetFormProps {
  trainingSet: TrainingSetWithRelations;
  promptTemplate: string;
  user: {
    email?: string | null | undefined;
    name?: string | null | undefined;
  };
  onUpdate?: (trainingSet: TrainingSetWithRelations) => void;
}

function TrainingSetForm({
  trainingSet,
  promptTemplate,
  onUpdate,
}: TrainingSetFormProps) {
  const router = useRouter();
  const [showQuestionsPrompts, setShowQuestionsPrompts] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [trainingSetData, setTrainingSetData] =
    useState<TrainingSetWithRelations>(trainingSet);
  const [isSaving, setIsSaving] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePromptChange = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = evt.target?.value;

      setTrainingSetData({ ...trainingSetData, prompt: val });
    },
    [trainingSetData]
  );

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTrainingSetData({ ...trainingSetData, name: e.target.value });
    },
    [trainingSetData]
  );

  const handleQnAChange = useCallback(
    (questionsAndTokens: QuestionAndAnswerPartial[]) => {
      const newPrompt = replaceTokens(promptTemplate, questionsAndTokens);
      setTrainingSetData({
        ...trainingSetData,
        prompt: newPrompt,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        questionsAndAnswers: questionsAndTokens as QuestionAndAnswer[],
      });
    },
    [promptTemplate, trainingSetData]
  );

  const handleSourcesChanged = useCallback(
    (sources: Omit<TrainingSource, "trainingSetId">[]) => {
      setTrainingSetData({
        ...trainingSetData,
        trainingSources: sources as TrainingSource[],
      });
    },
    [trainingSetData]
  );

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    let newSet: TrainingSetWithRelations;
    const toSave: TrainingSetWithRelations = {
      ...trainingSetData,
      prompt: trainingSetData.prompt.trim(),
    };
    try {
      if (toSave.id.length === 0) {
        newSet = await Data.createTrainingSet(toSave);
        setIsSaving(false);
        router.push(`/profile/training/${newSet.id}`);
      } else {
        newSet = await Data.updateTrainingSet(toSave);
        setIsSaving(false);
        if (onUpdate) onUpdate(newSet);
        setTrainingSetData(newSet);
        router.refresh();
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
  }, [onUpdate, router, trainingSetData]);

  const handleMissedQuestionsUpdate = useCallback(
    (missedQuestions: MissedQuestions[]) => {
      setTrainingSetData({
        ...trainingSetData,
        missedQuestions,
      });
    },
    [trainingSetData]
  );

  const handleTrain = useCallback(async () => {
    try {
      setError(null);
      setIsTraining(true);
      const newSet = await Data.trainTrainingSet(trainingSetData.id);
      console.log("newSet", newSet);
      if (newSet && newSet.id) {
        router.refresh();
      } else {
        setError(
          "😥 Something went wrong. Typically this error results from one or more of your documents being too big. Documents should each be 500kb or smaller."
        );
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setIsTraining(false);
    }
  }, [router, trainingSetData]);

  const isDirty = useMemo(() => {
    const areDifferent =
      JSON.stringify(trainingSetData) !== JSON.stringify(trainingSet);

    return areDifferent;
  }, [trainingSetData, trainingSet]);

  const canSave = useMemo(() => {
    const regex = /\{(?!(history|context|prompt)(?:.*)\})\w+\}/g;
    const allTokensRemoved = regex.exec(trainingSetData.prompt) === null;
    return trainingSetData.name.trim().length > 0 && allTokensRemoved;
  }, [trainingSetData.name, trainingSetData.prompt]);
  const isNew = trainingSet.id.length === 0;
  const allQuestionsAnswered = useMemo(
    () =>
      trainingSetData.questionsAndAnswers.length > 0 &&
      trainingSetData.questionsAndAnswers.every(
        (q) => q.answer.trim().length > 0
      ),
    [trainingSetData.questionsAndAnswers]
  );

  return (
    <div>
      <Input
        className="w-full p-2 mt-2 border rounded-md"
        alt="Training Set Name"
        placeholder="Training Set Name"
        type="text"
        name="name"
        value={trainingSetData.name}
        onChange={handleNameChange}
      />
      {!allQuestionsAnswered && (
        <InfoBoxDisplay
          hidden={false}
          handleDismiss={() => {
            console.log("dismiss");
          }}
          title="Questions and Answers"
          body="You need to answer all questions before you can save or train."
          dismissable={false}
        />
      )}
      {!isNew && (
        <div>
          <button
            onClick={() => setShowQuestionsPrompts(!showQuestionsPrompts)}
            className="text-blue-400"
          >
            {!showQuestionsPrompts ? "Answer questions" : "Hide questions"}
          </button>
        </div>
      )}
      {(showQuestionsPrompts || isNew) && (
        <QuestionsWizard
          onStateChange={handleQnAChange}
          questionsAndTokens={trainingSetData.questionsAndAnswers}
        />
      )}
      {!isNew && (
        <div>
          <button
            onClick={() => setShowPrompt(!showPrompt)}
            className="text-blue-400"
          >
            {!showPrompt ? "Show detailed prompt" : "Hide detailed prompt"}
          </button>
        </div>
      )}
      {showPrompt && (
        <AutoSizingTextArea
          className="w-full p-2 mt-2 border rounded-md dark:border-slate-600 dark:bg-slate-700"
          placeholder="Prompt"
          name="prompt"
          value={trainingSetData.prompt}
          onChange={handlePromptChange}
        />
      )}
      <Sources
        trainingSetId={trainingSetData.id}
        sources={trainingSetData.trainingSources}
        onSourcesChanged={handleSourcesChanged}
      />
      <MissedQuestionsList trainingSet={trainingSetData} onUpdate={handleMissedQuestionsUpdate} />
      <div className="flex flex-row">
        <button
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleSave}
          disabled={!isDirty || isSaving || !canSave}
          className="w-full p-2 mt-2 text-white bg-blue-400 border rounded-md disabled:bg-slate-700 disabled:text-opacity-50 dark:border-slate-600 dark:bg-blue-300"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
        {!isNew && (
          <button
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleTrain}
            disabled={isDirty || isTraining}
            className="w-full p-2 mt-2 text-white bg-green-400 border rounded-md disabled:bg-slate-700 disabled:text-opacity-50 dark:border-slate-600 dark:bg-green-400"
          >
            Train
          </button>
        )}
      </div>
      {/* {isDirty ? <p>Unsaved changes</p> : <p>No unsaved</p>} */}
      {/* {isSaving ? <p>Saving...</p> : <p>Saved</p>}
      {isTraining ? <p>Training...</p> : <p>Trained</p>}*/}
      {error && <ErrorBox message={error} title="An error has occurred" />}
    </div>
  );
}
export default function TrainingSetPage(props: TrainingSetFormProps) {
  const { trainingSet, onUpdate } = props;
  const [trainingSetData, setTrainingSetData] = useState(trainingSet);

  const handleUpdate = useCallback(
    (set: TrainingSetWithRelations) => {
      setTrainingSetData(set);
      if (onUpdate) onUpdate(set);
    },
    [onUpdate]
  );

  return (
    <TrainingSetForm
      {...props}
      trainingSet={trainingSetData}
      onUpdate={handleUpdate}
    />
  );
}
