"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Sources from "./Sources";
import Data from "~/utils/data-client";
import { useRouter } from "next/navigation";
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
import replaceTokens from "~/utils/replace-tokens";
import MissedQuestionsList from "./MissedQuestionsList";
import { useSession } from "next-auth/react";
import Modal from "~/app/components/ModalDialog";
import { SaveIcon } from "~/app/components/SvgIcons";
import { useAuthenticatedSocket } from "~/hooks/use-socket";
import { TrainingProgressDisplay } from "./TrainingProgressDisplay";
import Tabs from "~/app/components/Tabs";
import { toast } from "react-toastify";
import { DetailsTab } from "./DetailsTab";
import { PromptTab } from "./PromptTab";
import { OptionsTab } from "./OptionsTab";

export type TabsList = "Details" | "Prompt" | "Options" | "Sources";
export interface TrainingSetFormProps {
  trainingSet: TrainingSetWithRelations;
  promptTemplate: string;
  user: {
    email?: string | null | undefined;
    name?: string | null | undefined;
  };
  onUpdate?: (trainingSet: TrainingSetWithRelations) => void;
  activeTab?: TabsList;
}

export function TrainingSetForm({
  trainingSet,
  promptTemplate,
  onUpdate,
  activeTab,
}: TrainingSetFormProps) {
  const session = useSession();
  const router = useRouter();
  const [trainingSetData, setTrainingSetData] =
    useState<TrainingSetWithRelations>(trainingSet);
  const [isSaving, setIsSaving] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRefinePromptModal, setShowRefinePromptModal] = useState(false);
  const socketRef = useAuthenticatedSocket();
  const handleTrainingStarted = useCallback(() => {
    setIsTraining(true);
  }, []);
  const [isAutoTraining, setIsAutoTraining] = useState(false);

  const handleTrainingComplete = useCallback(() => {
    setIsTraining(false);
    toast("🎉 Training Complete", {
      type: "success",
    });
    router.refresh();
    // TODO: Figure out why router.refresh() doesn't work.
  }, [router]);

  const handleTrainingError = useCallback((data: { error: string }) => {
    console.log(data.error);
    toast(`⛔️ ${data.error ?? "Training Failed"}`, {
      type: "error",
    });
    setIsTraining(false);
    // setError(data.error);
  }, []);

  /**
   * If a training progress update is received, set the training state to true.
   * This is used to handle when a user navigates away from the page while training is in progress, and returns,
   * or when another user (Shared!) visits the page while training is in progress.
   */
  const handleTrainingProgress = useCallback(() => {
    setIsTraining(true);
  }, []);

  useEffect(() => {
    if (socketRef.socket?.connected) {
      // if (!joinRef.current || joinRef.current !== socketRef.socket) {
      //   joinRef.current = socketRef.socket;
      //   socketRef.socket.emit("join-training", {
      //     payload: { id: trainingSet.id },
      //   });
      // }

      // const leaveTraining = () => {
      //   socketRef.socket?.emit("leave-training", {
      //     payload: { id: trainingSet.id },
      //   });
      //   joinRef.current = undefined;
      // };

      const leaveTraining = socketRef.join(
        `training-${trainingSet.id}`,
        "private"
      );

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
      const removeTrainingProgress = socketRef.onMessage(
        "training-progress",
        handleTrainingProgress
      );
      return () => {
        if (socketRef.socket?.connected) {
          removeHandleTrainingComplete();
          removeHandleTrainingStarted();
          removeTrainingError();
          removeTrainingProgress();
          leaveTraining();
        }
      };
    }
  }, [
    handleTrainingComplete,
    handleTrainingError,
    handleTrainingProgress,
    handleTrainingStarted,
    router,
    socketRef,
    socketRef.socket,
    trainingSet.id,
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

  const handleConfirmShareChanges = useCallback(
    (shares: TrainingSetShares[]) => {
      setTrainingSetData({
        ...trainingSetData,
        trainingSetShares: shares,
      });
    },
    [trainingSetData]
  );

  const handleRefinePromptConfirmed = useCallback(() => {
    setIsAutoTraining((isAutoTraining) => !isAutoTraining);
    setShowRefinePromptModal(false);
  }, []);

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

  const handlePromptGenerated = useCallback(
    (prompt: string) => {
      setTrainingSetData({
        ...trainingSetData,
        prompt,
      });
      setIsAutoTraining(false);
      toast("🎉 Prompt Generated!", { type: "success" });
    },
    [trainingSetData]
  );

  const trainingOptions = useMemo(() => {
    const options: TrainingOptions = (trainingSetData.trainingOptions ??
      defaultTrainingOptions) as TrainingOptions;
    return options;
  }, [trainingSetData.trainingOptions]);

  const handleTrainingOptionToggle = useCallback(
    (option: string) => {
      router.push(
        `/profile/training/${trainingSetData.id}/${option.toLowerCase()}`
      );
    },
    [router, trainingSetData.id]
  );

  const handleAutoTrainClicked = useCallback(() => {
    if (trainingSetData.prompt.length === 0) {
      setIsAutoTraining((isAutoTraining) => !isAutoTraining);
    } else {
      if (isAutoTraining) {
        setIsAutoTraining(false);
        return;
      }
      setShowRefinePromptModal(true);
    }
  }, [isAutoTraining, trainingSetData.prompt.length]);

  const shared = trainingSetData.trainingSetShares.find(
    (s) => s.acceptedUserId === session.data?.user.id
  );
  const role = shared?.role ?? "OWNER";
  const isShared = shared !== undefined;
  const canEdit = role === "OWNER" || role === "EDITOR";
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
  const allQuestionsAnswered = useMemo(
    () =>
      trainingSetData.questionsAndAnswers.length > 0 &&
      trainingSetData.questionsAndAnswers.every(
        (q) => q.answer.trim().length > 0
      ),
    [trainingSetData.questionsAndAnswers]
  );

  return (
    <div className="h-full bg-slate-50">
      <div className="h-full w-full bg-slate-100">
        <Tabs
          header={<h1 className="text-sm">{trainingSet.name}</h1>}
          initialSelectedTab={activeTab}
          onSelectNewTab={handleTrainingOptionToggle}
          additionalItems={[
            <div className="flex h-full flex-col justify-center" key="Save">
              <button
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={handleSave}
                disabled={!isDirty || isSaving || !canSave}
                className="mr-2 w-24 rounded-md border bg-blue-400 p-2 text-white disabled:bg-slate-700 disabled:text-opacity-50 dark:border-slate-600 dark:bg-blue-300"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>,
            <div className="flex h-full flex-col justify-center" key="Save">
                <button
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onClick={handleTrain}
                  disabled={
                    !socketRef.connected ||
                    isDirty ||
                    isTraining ||
                    trainingSetData.version === trainingSet.trainingIndexVersion
                  }
                  title={socketRef.connected ? "Train the model" : "Server is offline"}
                  className={`w-24 rounded-md border bg-green-400 p-2 text-white disabled:bg-slate-700 disabled:text-opacity-50 dark:border-slate-600 dark:bg-green-400 ${
                    isTraining ? "animate-pulse" : ""
                  } ${socketRef.connected ? "bg-green-400 dark:bg-green-500" : "disabled:bg-red-400 disabled:dark:bg-red-500"}`}
                >
                  Train
                </button>
            </div>
          ]}
          tabContent={{
            Details: (
              <DetailsTab
                canEdit={canEdit}
                handleConfirmShareChanges={handleConfirmShareChanges}
                handleNameChange={handleNameChange}
                isShared={isShared}
                pendingData={trainingSetData}
                trainingSet={trainingSet}
              />
            ),

            Prompt: (
              <PromptTab
                onPromptGenerated={handlePromptGenerated}
                {...{
                  allQuestionsAnswered,
                  canEdit,
                  trainingSetData,
                  handleQnAChange,
                  handlePromptChange,
                  onAutoTrainClicked: handleAutoTrainClicked,
                  isAutoTraining,
                }}
              />
            ),
            Options: (
              <OptionsTab
                {...{ canEdit, trainingOptions, handleTrainingOptionChanged }}
              />
            ),
            Sources: (
              <div className="h-auto p-2 px-4">
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
              </div>
            ),
          }}
        />
      </div>

      {error && <ErrorBox message={error} title="An error has occurred" />}
      <Modal title="" show={isTraining} icon={<SaveIcon />}>
        <div className="w-full">
          <TrainingProgressDisplay
            onMessage={socketRef.onMessage}
            socket={socketRef.socket}
            isTraining={isTraining}
          />
        </div>
      </Modal>
      <Modal
        title="Refining Your Prompt"
        show={showRefinePromptModal}
        onCancel={() => setShowRefinePromptModal(false)}
        confirmText="Continue"
        onConfirm={handleRefinePromptConfirmed}
        closeText="Cancel"
      >
        <p>A note on refining your prompt:</p>
        <ul className="ml-4 list-disc">
          <li>The prompt used dramatically influences your results.</li>
          <li>
            This functionality is experimental and may not work as expected. As
            such, you should copy and save your current prompt somewhere in case
            you want to come back to it.
          </li>
        </ul>
      </Modal>
    </div>
  );
}
