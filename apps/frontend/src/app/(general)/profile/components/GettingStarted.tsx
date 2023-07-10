import { type UserSettings } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { MdCheck } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import DismissableInfoBox from "@/app/components/DismissableInfoBox";

interface GettingStartedProps {
  trainingSets: number;
  trainingSetHasDataSources: boolean;
  trainingSetTrained: boolean;
  trainingSetHasPrompt: boolean;
  userSettings: UserSettings | null;
  publicChats: number;
}

function ChecklistItem({
  complete,
  message,
  stepNumber,
  disabled,
}: {
  complete: boolean;
  message: string | React.ReactNode;
  stepNumber: number;
  disabled?: boolean;
}) {
  return (
    <li className={twMerge("flex flex-row", disabled ? "opacity-40" : "")}>
      <div
        className={twMerge(
          "mx-2 flex h-8 w-8 flex-col items-center rounded-full border-2 border-slate-500 bg-blue-300 pt-[2px] text-center",
          complete ? "bg-green-500" : ""
        )}
      >
        {complete ? <MdCheck className="mt-[4px]" /> : stepNumber}
      </div>
      <div className="flex flex-col justify-center">{message}</div>
    </li>
  );
}

function GettingStarted({
  trainingSets,
  trainingSetHasDataSources,
  trainingSetTrained,
  trainingSetHasPrompt,
  userSettings,
  publicChats,
}: GettingStartedProps) {
  const allComplete =
    trainingSets > 0 &&
    trainingSetTrained &&
    trainingSetHasPrompt &&
    trainingSetHasDataSources &&
    !!userSettings &&
    (userSettings.openAIApiKey ?? "").length > 0;
  if (allComplete)
    return (
      <DismissableInfoBox
        type="success"
        title="Getting Started"
        body="You're all set up! You can now start chatting with your data."
        dismissable
        dismissableId="getting-started"
      />
    );
  return (
    <div className="w-full rounded-md bg-slate-200 p-4 dark:bg-slate-500">
      <h1 className="mb-2 text-lg text-slate-600 dark:text-slate-300">
        Getting Started
      </h1>
      <p>
        There are few setup steps to follow before you will be able to
        experience the magic of chat.
      </p>
      <ol className="z-30 mt-6 list-inside">
        <ChecklistItem
          stepNumber={1}
          complete={
            !!userSettings && (userSettings.openAIApiKey ?? "").length > 0
          }
          message={
            <p>
              <Link
                href="/profile/settings"
                aria-label="Set up profile and OpenAI Api Key"
                className="bg-blue-200 p-1 text-blue-600"
              >
                Set up
              </Link>{" "}
              your profile and add your OpenAI Api Key
            </p>
          }
        />
        <li className="ml-6 h-4 w-px border-l-2 border-l-slate-500"></li>
        <ChecklistItem
          stepNumber={2}
          complete={trainingSets > 0}
          message={
            <p>
              <Link
                href="/profile/training"
                aria-label="Create a training set"
                className="bg-blue-200 p-1 text-blue-600"
              >
                Create
              </Link>{" "}
              a training set.
            </p>
          }
        />
        <li className="ml-6 h-4 w-px border-l-2 border-l-slate-500"></li>
        <ChecklistItem
          stepNumber={3}
          complete={trainingSetHasDataSources}
          message={
            <p>
              <Link
                href="/profile/training/first/sources"
                aria-label="Create a training set"
                className="bg-blue-200 p-1 text-blue-600"
              >
                Add
              </Link>{" "}
              sources of data to your training set, and train the bot.
            </p>
          }
        />
        <li className="ml-6 h-4 w-px border-l-2 border-l-slate-500"></li>
        <ChecklistItem
          stepNumber={4}
          complete={trainingSetHasPrompt}
          message={
            <p>
              <Link
                href="/profile/training/first/prompt?generate=true"
                aria-label="Create a training set"
                className="bg-blue-200 p-1 text-blue-600"
              >
                Generate
              </Link>{" "}
              a prompt for your bot to drive its conversations.
            </p>
          }
        />
        <li className="ml-6 h-4 w-px border-l-2 border-l-slate-500"></li>
        <ChecklistItem
          stepNumber={5}
          complete={trainingSetTrained}
          message={
            <p>
              <Link
                href="/profile/training/first/sources"
                aria-label="Create a training set"
                className="bg-blue-200 p-1 text-blue-600"
              >
                Train
              </Link>{" "}
              your data set to make it usable.
            </p>
          }
        />
        <li className="ml-6 h-4 w-px border-l-2 border-l-slate-500"></li>
        <ChecklistItem
          stepNumber={6}
          complete={publicChats > 0}
          message={
            <p>
              <Link
                href="/profile/training"
                aria-label="Publish a public chat"
                className="bg-blue-200 p-1 text-blue-600"
              >
                Publish
              </Link>{" "}
              a public chat for people to interact with your bot..
            </p>
          }
        />
      </ol>
    </div>
  );
}

export default React.memo(GettingStarted);
