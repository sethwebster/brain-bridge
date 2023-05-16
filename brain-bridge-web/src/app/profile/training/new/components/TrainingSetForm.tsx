"use client";

import { useCallback, useState, useRef, useMemo } from "react";
import { QuestionAnswerToken, QuestionsWizard } from "./QuestionsWizard";
import Sources from "./Sources";
import Data from "@/utils/data";
import { useRouter } from "next/navigation";
import { AutoSizingTextArea } from "./AutoSizingTextArea";
import ErrorBox from "@/app/components/error-box";

interface TrainingSetFormProps {
  trainingSet?: TrainingSet;
  promptTemplate: string;
  user: {
    email?: string | null | undefined;
    name?: string | null | undefined;
  };
  onUpdate?: (trainingSet: TrainingSet) => void;
}

function TrainingSetForm({
  trainingSet,
  user,
  promptTemplate,
  onUpdate,
}: TrainingSetFormProps) {
  const router = useRouter();
  const [showQuestionsPrompts, setShowQuestionsPrompts] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [trainingSetData, setTrainingSetData] = useState<TrainingSet>(
    trainingSet ?? {
      name: "",
      id: "<new>",
      sources: [],
      version: 0,
      dateCreated: new Date(),
      prompt: promptTemplate,
    }
  );

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
    (questionsAndTokens: QuestionAnswerToken[]) => {
      const newPrompt = questionsAndTokens.reduce((acc, curr) => {
        if (curr.answer.trim().length === 0) return acc;
        if (curr.token.startsWith("{csv:")) {
          const csv = curr.answer
            .split(",")
            .map((x, index) => `${index + 1}. ${x.trim()}`)
            .join("\n");
          return acc.replaceAll(curr.token, csv);
        }
        return acc.replaceAll(curr.token, curr.answer);
      }, promptTemplate);

      setTrainingSetData({ ...trainingSetData, prompt: newPrompt });
    },
    [promptTemplate, trainingSetData]
  );

  const handleSourcesChanged = useCallback(
    (sources: TrainingSource[]) => {
      setTrainingSetData({ ...trainingSetData, sources });
    },
    [trainingSetData]
  );

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    let newSet: TrainingSet;
    if (trainingSetData.id === "<new>") {
      newSet = await Data.createTrainingSet(
        trainingSetData,
        user as { email: string }
      );
      setIsSaving(false);
      router.push(`/profile/training/${newSet.id}`);
    } else {
      newSet = await Data.updateTrainingSet(
        trainingSetData,
        user as { email: string }
      );
      setIsSaving(false);
      // setTrainingSetData(newSet);
      if (onUpdate) onUpdate(newSet);
    }
  }, [onUpdate, router, trainingSetData, user]);

  const handleTrain = useCallback(async () => {
    setError(null);
    setIsTraining(true);
    const newSet = await Data.trainTrainingSet(
      trainingSetData,
      user as { email: string }
    );
    if (newSet.success) {
      router.push(`/profile/training/${newSet.data.id}`);
    } else {
      setError(`Training failed: ${newSet.error} `);
    }
    setIsTraining(false);
  }, [router, trainingSetData, user]);

  const isDirty = useMemo(() => {
    return JSON.stringify(trainingSetData) !== JSON.stringify(trainingSet);
  }, [trainingSetData, trainingSet]);

  const canSave = useMemo(() => {
    let regex = /\{(?!(history|context|prompt)\})\w+\}/g;
    const allTokensRemoved = regex.exec(trainingSetData.prompt) === null;
    return trainingSetData.name.trim().length > 0 && allTokensRemoved;
  }, [trainingSetData.name, trainingSetData.prompt]);

  return (
    <div>
      <input
        className="w-full p-2 mt-2 border rounded-md dark:bg-slate-700 dark:border-slate-600"
        alt="Training Set Name"
        placeholder="Training Set Name"
        type="text"
        name="name"
        value={trainingSetData.name}
        onChange={handleNameChange}
      />
      {trainingSetData.id !== "<new>" && (
        <div>
          <button
            onClick={() => setShowQuestionsPrompts(!showQuestionsPrompts)}
            className="text-blue-400"
          >
            {!showQuestionsPrompts
              ? "Answer questions again"
              : "Hide questions"}
          </button>
        </div>
      )}
      {(showQuestionsPrompts || trainingSetData.id === "<new>") && (
        <QuestionsWizard onStateChange={handleQnAChange} />
      )}
      {trainingSetData.id !== "<new>" && (
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
          className="w-full p-2 mt-2 border rounded-md dark:bg-slate-700 dark:border-slate-600"
          placeholder="Prompt"
          name="prompt"
          value={trainingSetData.prompt}
          onChange={handlePromptChange}
        />
      )}
      <Sources
        sources={trainingSetData.sources}
        onSourcesChanged={handleSourcesChanged}
      />
      <div className="flex flex-row">
        <button
          onClick={handleSave}
          disabled={!isDirty || isSaving || !canSave}
          className="w-full p-2 mt-2 text-white bg-blue-400 border rounded-md disabled:bg-slate-400 dark:bg-slate-700 dark:border-slate-600"
        >
          Save
        </button>
        {trainingSetData.id !== "<new>" && (
          <button
            onClick={handleTrain}
            disabled={isDirty || isTraining}
            className="w-full p-2 mt-2 text-white bg-green-400 border rounded-md disabled:bg-slate-400 dark:bg-slate-700 dark:border-slate-600"
          >
            Train
          </button>
        )}
      </div>
      {isSaving ? <p>Saving...</p> : <p>Saved</p>}
      {isTraining ? <p>Training...</p> : <p>Trained</p>}
      {isDirty ? <p>Unsaved changes</p> : <p>No unsaved</p>}
      {error && <ErrorBox message={error} title="An error has occurred" />}
    </div>
  );
}
export default function TrainingSetPage(props: TrainingSetFormProps) {
  const { trainingSet, onUpdate } = props;
  const [trainingSetData, setTrainingSetData] = useState(trainingSet);

  const handleUpdate = useCallback(
    (set: TrainingSet) => {
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
