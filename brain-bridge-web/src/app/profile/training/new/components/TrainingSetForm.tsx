"use client";

import { useCallback, useState, useRef, useMemo } from "react";
import { QuestionAnswerToken, QuestionsWizard } from "./QuestionsWizard";
import Sources from "./Sources";
import Data from "@/utils/data";
import { useRouter } from "next/navigation";
import { AutoSizingTextArea } from "./AutoSizingTextArea";

export default function NewTrainingSetForm({
  trainingSet,
  user,
  promptTemplate,
}: {
  trainingSet?: TrainingSet;
  promptTemplate: string;
  user: { email?: string | null | undefined; name?: string | null | undefined };
}) {
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
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isTraining, setIsTraining] = useState(false);

  // useAutosizeTextArea(textAreaRef.current, trainingSetData.prompt, 500);

  const router = useRouter();
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
    } else {
      newSet = await Data.updateTrainingSet(
        trainingSetData,
        user as { email: string }
      );
    }
    setIsSaving(false);
    router.push(`/profile/training/${newSet.id}`);
  }, [router, trainingSetData, user]);

  const handleTrain = useCallback(async () => {
    setIsTraining(true);
    let newSet: TrainingSet;
    newSet = await Data.createTrainingSet(
      trainingSetData,
      user as { email: string }
    );
    setIsTraining(false);
    router.push(`/profile/training/${newSet.id}`);
  }, [router, trainingSetData, user]);

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
          disabled={isSaving || !canSave}
          className="w-full p-2 mt-2 text-white bg-blue-400 border rounded-md disabled:bg-slate-400 dark:bg-slate-700 dark:border-slate-600"
        >
          Save
        </button>
        <button
          onClick={handleTrain}
          disabled={isTraining}
          className="w-full p-2 mt-2 text-white bg-green-400 border rounded-md disabled:bg-slate-400 dark:bg-slate-700 dark:border-slate-600"
        >
          Train
        </button>
      </div>
    </div>
  );
}
