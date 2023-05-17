"use client";

import { useCallback, useState, useRef, useMemo } from "react";
import {
  QuestionsAndTokens,
  QuestionsWizard,
} from "./QuestionsWizard";
import Sources from "./Sources";
import Data from "@/utils/data";
import { useRouter } from "next/navigation";
import { AutoSizingTextArea } from "./AutoSizingTextArea";
import ErrorBox from "@/app/components/error-box";

function removeFooter(prompt: string) {
  const footerMarker = "-- do not edit below this line --";
  const footerIndex = prompt.indexOf(footerMarker);
  if (footerIndex === -1) {
    return prompt;
  }
  return prompt.substring(0, footerIndex);
}

interface TrainingSetFormProps {
  trainingSet?: TrainingSet;
  promptTemplate: string;
  promptFooter: string;
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
  promptFooter,
  onUpdate,
}: TrainingSetFormProps) {
  console.log(trainingSet);
  const router = useRouter();
  const [showQuestionsPrompts, setShowQuestionsPrompts] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [trainingSetData, setTrainingSetData] = useState<TrainingSet>(
    trainingSet
      ? {
          ...trainingSet,
          questionsAndAnswers: trainingSet.questionsAndAnswers || QuestionsAndTokens,
          prompt: removeFooter(trainingSet.prompt),
        }
      : {
          name: "",
          id: "<new>",
          sources: [],
          version: 0,
          dateCreated: new Date(),
          prompt: promptTemplate,
          questionsAndAnswers: QuestionsAndTokens,
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

  const replaceTokens = useCallback(
    (textWithTokens: string, tokensWithAnswers: QuestionAnswerToken[]) => {
      return tokensWithAnswers.reduce((acc, curr) => {
        if (curr.answer.trim().length === 0) return acc;
        if (curr.token.startsWith("{csv:")) {
          const csv = curr.answer
            .split(",")
            .map((x: string, index: number) => `${index + 1}. ${x.trim()}`)
            .join("\n");
          return acc.replaceAll(curr.token, csv);
        }
        return acc.replaceAll(curr.token, curr.answer);
      }, textWithTokens);
    },
    []
  );

  const handleQnAChange = useCallback(
    (questionsAndTokens: QuestionAnswerToken[]) => {
      const newPrompt = replaceTokens(promptTemplate, questionsAndTokens);
      setTrainingSetData({
        ...trainingSetData,
        prompt: newPrompt,
        questionsAndAnswers: questionsAndTokens,
      });
    },
    [promptTemplate, replaceTokens, trainingSetData]
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
    const toSave: TrainingSet = {
      ...trainingSetData,
      prompt:
        trainingSetData.prompt.trim() +
        "\n\n" +
        replaceTokens(promptFooter, trainingSetData.questionsAndAnswers),
    };
    console.log("TO SAVE", toSave);
    if (toSave.id === "<new>") {
      newSet = await Data.createTrainingSet(toSave, user as { email: string });
      setIsSaving(false);
      router.push(`/profile/training/${newSet.id}`);
    } else {
      newSet = await Data.updateTrainingSet(toSave, user as { email: string });
      setIsSaving(false);
      // setTrainingSetData(newSet);
      if (onUpdate) onUpdate(newSet);
    }
  }, [onUpdate, promptFooter, router, trainingSetData, user]);

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
    const trainingSetCleaned = {
      ...trainingSet,
      prompt: removeFooter(trainingSet!.prompt),
    };
    return (
      JSON.stringify(trainingSetData) !== JSON.stringify(trainingSetCleaned)
    );
  }, [trainingSetData, trainingSet]);

  const canSave = useMemo(() => {
    let regex = /\{(?!(history|context|prompt)\})\w+\}/g;
    const allTokensRemoved = regex.exec(trainingSetData.prompt) === null;
    console.log(
      "Can Save:",
      trainingSetData.name.trim().length > 0 && allTokensRemoved
    );
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
        <QuestionsWizard onStateChange={handleQnAChange} questionsAndTokens={trainingSetData.questionsAndAnswers} />
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
      {/* {isSaving ? <p>Saving...</p> : <p>Saved</p>}
      {isTraining ? <p>Training...</p> : <p>Trained</p>}
      {isDirty ? <p>Unsaved changes</p> : <p>No unsaved</p>} */}
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
