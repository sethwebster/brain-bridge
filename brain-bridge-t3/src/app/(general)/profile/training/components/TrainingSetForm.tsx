"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { QuestionsWizard } from "./QuestionsWizard";
import Sources from "./Sources";
import Data from "~/utils/data-client";
import { useRouter } from "next/navigation";
import { AutoSizingTextArea } from "./AutoSizingTextArea";
import Input from "~/app/components/Input";
import ErrorBox from "~/app/components/ErrorBox";
import {
  type TrainingSetShares,
  type MissedQuestions,
  type QuestionAndAnswer,
  type TrainingSource,
} from "@prisma/client";
import {
  type TrainingOptions,
  type QuestionAndAnswerPartial,
  type TrainingSetWithRelations,
  defaultTrainingOptions,
} from "~/server/interfaces/types";
import { InfoBoxDisplay } from "~/app/components/InfoBox";
import replaceTokens from "~/utils/replace-tokens";
import MissedQuestionsList from "./MissedQuestionsList";
import Shares from "./Shares";
import { useSession } from "next-auth/react";
import Toggle from "~/app/components/toggle";
import Modal from "~/app/components/ModalDialog";
import { ShareIcon } from "~/app/components/SvgIcons";
import { useAuthenticatedSocket } from "~/hooks/use-socket";
import { TrainingProgressDisplay } from "./TrainingProgressDisplay";

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
  const session = useSession();
  const router = useRouter();
  const [showQuestionsPrompts, setShowQuestionsPrompts] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [trainingSetData, setTrainingSetData] =
    useState<TrainingSetWithRelations>(trainingSet);
  const [isSaving, setIsSaving] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUseOwnPromptModal, setShowUseOwnPromptModal] = useState(false);
  const socketRef = useAuthenticatedSocket();

  const handleTrainingStarted = useCallback(() => {
    setIsTraining(true);
  }, []);

  const handleTrainingComplete = useCallback(() => {
    setIsTraining(false);
    router.refresh();
  }, [router]);

  const handleTrainingError = useCallback((data: { error: string }) => {
    setIsTraining(false);
    setError(data.error);
  }, []);

  useEffect(() => {
    if (socketRef.socket?.connected) {
      const removeHandleTrainingStarted = socketRef.onMessage(
        "training-started",
        handleTrainingStarted
      );
      const removeHandleTrainingComplete = socketRef.onMessage(
        "training-complete",
        handleTrainingComplete
      );
      const removeTrainingError = socketRef.onMessage(
        "training-error",
        handleTrainingError
      );
      return () => {
        if (socketRef.socket?.connected) {
          removeHandleTrainingComplete();
          removeHandleTrainingStarted();
          removeTrainingError();
        }
      };
    }
  }, [
    handleTrainingComplete,
    handleTrainingError,
    handleTrainingStarted,
    router,
    socketRef,
    socketRef.socket,
  ]);
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

  /**
   * Train the model
   */
  const handleTrain = useCallback(() => {
    try {
      const startTraining = () => {
        socketRef.sendMessage("train", {
          trainingSetId: trainingSetData.id,
        });
      };
      setError(null);
      startTraining();
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setIsTraining(false);
    }
  }, [socketRef, trainingSetData.id]);

  /**
   * Check if the training set has been modified
   */
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

  const handleConfirmShareChanges = useCallback(
    (shares: TrainingSetShares[]) => {
      setTrainingSetData({
        ...trainingSetData,
        trainingSetShares: shares,
      });
    },
    [trainingSetData]
  );

  const handleUseOwnPromptConfirm = useCallback(() => {
    setTrainingSetData({
      ...trainingSetData,
      useOwnPrompt: true,
    });
    setShowUseOwnPromptModal(false);
  }, [trainingSetData]);

  const handleUseOwnPromptToggle = useCallback(
    (useOwnPrompt: boolean) => {
      if (useOwnPrompt) {
        setShowUseOwnPromptModal(true);
      } else {
        setTrainingSetData({
          ...trainingSetData,
          useOwnPrompt: false,
        });
      }
    },
    [trainingSetData]
  );

  const handleTrainingOptionChanged = useCallback(
    (option: string, e: React.ChangeEvent<HTMLInputElement>) => {
      setTrainingSetData((trainingSetData) => ({
        ...trainingSetData,
        trainingOptions: {
          ...((trainingSetData.trainingOptions ||
            defaultTrainingOptions) as TrainingOptions),
          [option]: e.target.value,
        },
      }));
    },
    []
  );

  const shared = trainingSetData.trainingSetShares.find(
    (s) => s.acceptedUserId === session.data?.user.id
  );
  const role = shared?.role ?? "OWNER";
  const isShared = shared !== undefined;
  const canEdit = role === "OWNER" || role === "EDITOR";

  const trainingOptions = useMemo(() => {
    const options: TrainingOptions = (trainingSetData.trainingOptions ??
      defaultTrainingOptions) as TrainingOptions;
    return options;
  }, [trainingSetData.trainingOptions]);
  return (
    <div className="mb-10">
      <header className="flex justify-between border-b border-gray-400 pb-2 ">
        <div>
          <h1 className="text-2xl">{trainingSet.name}</h1>
          {isShared ? (
            <div className="flex flex-row">
              <div className=" mr-1 flex h-4 w-12  flex-row justify-center rounded-sm bg-amber-500 bg-opacity-80">
                <ShareIcon
                  fillColor="white"
                  className="h-4 w-4 border-red-800"
                />
              </div>
              <small>Shared with you</small>
            </div>
          ) : (
            <></>
          )}
        </div>
        <Shares
          trainingSet={trainingSetData}
          onConfirmChanges={handleConfirmShareChanges}
        />
      </header>

      <Input
        disabled={!canEdit}
        className="mt-2 w-full rounded-md border p-2"
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
      <div className="mt-2">
        <Toggle
          disabled={!canEdit}
          value={trainingSetData.useOwnPrompt}
          label="Use custom prompt"
          onChange={handleUseOwnPromptToggle}
        />
      </div>
      {!trainingSetData.useOwnPrompt && !isNew && (
        <div>
          <button
            onClick={() => setShowQuestionsPrompts(!showQuestionsPrompts)}
            className="text-blue-400"
          >
            {!showQuestionsPrompts ? "Answer questions" : "Hide questions"}
          </button>
        </div>
      )}
      {!trainingSetData.useOwnPrompt && (showQuestionsPrompts || isNew) && (
        <QuestionsWizard
          disabled={!canEdit}
          onStateChange={handleQnAChange}
          questionsAndTokens={trainingSetData.questionsAndAnswers}
        />
      )}
      {trainingSetData.useOwnPrompt && !isNew && (
        <div>
          <button
            onClick={() => setShowPrompt(!showPrompt)}
            className="text-blue-400"
          >
            {!showPrompt ? "Show detailed prompt" : "Hide detailed prompt"}
          </button>
        </div>
      )}
      {trainingSetData.useOwnPrompt && showPrompt && (
        <AutoSizingTextArea
          className="mt-2 w-full rounded-md border p-2 dark:border-slate-600 dark:bg-slate-700"
          placeholder="Prompt"
          name="prompt"
          value={trainingSetData.prompt}
          onChange={handlePromptChange}
          disabled={!trainingSetData.useOwnPrompt}
        />
      )}
      <div>
        <h3 className="text-lg">Training Options</h3>
        <div className="mb-4 flex flex-col">
          <label className="text-sm">Maximum Segment Length</label>
          <Input
            className="p-2"
            disabled={!canEdit}
            type="text"
            name="maxSegmentLength"
            value={trainingOptions.maxSegmentLength}
            placeholder="Enter a maximum segment length. Default is 2000."
            onChange={(e) => handleTrainingOptionChanged("maxSegmentLength", e)}
          />
          <small>
            This is the maximum length of each document segment when split.
          </small>
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Document Segment Overlap</label>
          <Input
            className="p-2"
            disabled={!canEdit}
            type="text"
            name="maxSegmentLength"
            value={trainingOptions.overlapBetweenSegments}
            placeholder="Enter a desired document overlap. Default is 200."
            onChange={(e) =>
              handleTrainingOptionChanged("overlapBetweenSegments", e)
            }
          />
          <small>
            This is the amount of overlap between each document segment when
            split.
          </small>
        </div>
      </div>
      <Sources
        disabled={!canEdit}
        trainingSetId={trainingSetData.id}
        sources={trainingSetData.trainingSources}
        onSourcesChanged={handleSourcesChanged}
      />
      <MissedQuestionsList
        disabled={!canEdit}
        trainingSet={trainingSetData}
        onUpdate={handleMissedQuestionsUpdate}
      />
      <TrainingProgressDisplay
        onMessage={socketRef.onMessage}
        socket={socketRef.socket}
        isTraining={isTraining}
      />
      <div className="flex flex-row">
        <button
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleSave}
          disabled={!isDirty || isSaving || !canSave}
          className="mt-2 w-full rounded-md border bg-blue-400 p-2 text-white disabled:bg-slate-700 disabled:text-opacity-50 dark:border-slate-600 dark:bg-blue-300"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
        {!isNew && (
          <button
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleTrain}
            disabled={
              isDirty ||
              isTraining ||
              trainingSetData.version === trainingSet.trainingIndexVersion
            }
            className="mt-2 w-full rounded-md border bg-green-400 p-2 text-white disabled:bg-slate-700 disabled:text-opacity-50 dark:border-slate-600 dark:bg-green-400"
          >
            Train
          </button>
        )}
      </div>
      {/* {isDirty ? <p>Unsaved changes</p> : <p>No unsaved</p>} */}
      {/* {isSaving ? <p>Saving...</p> : <p>Saved</p>}
      {isTraining ? <p>Training...</p> : <p>Trained</p>}*/}
      {error && <ErrorBox message={error} title="An error has occurred" />}
      <Modal
        title="Use your own prompt"
        show={showUseOwnPromptModal}
        onCancel={() => setShowUseOwnPromptModal(false)}
        confirmText="Use my own prompt"
        onConfirm={handleUseOwnPromptConfirm}
        closeText="Use default prompt"
      >
        <p>Use your own prompt, but some things to keep in mind:</p>
        <ul className="ml-4 list-disc">
          <li>The prompt used dramatically influences your results.</li>
          <li>
            We prepend front and back matter to control the output which may
            interfere with your desired results.
          </li>
        </ul>
      </Modal>
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
