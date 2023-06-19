"use client";
import { Suspense } from "react";
import Input from "~/app/components/Input";
import { type TrainingSetShares } from "@prisma/client";
import { type TrainingSetWithRelations } from "~/server/interfaces/types";
import Shares from "./Shares";
import { ShareIcon } from "~/app/components/SvgIcons";
import Dashboard from "./Dashboard";
import { calculateCost } from "../../../../../lib/calculate-costs";

export const DetailsTab = ({
  isShared,
  trainingSet,
  pendingData,
  canEdit,
  handleNameChange,
  handleConfirmShareChanges,
}: {
  canEdit: boolean;
  isShared: boolean;
  trainingSet: TrainingSetWithRelations;
  pendingData: TrainingSetWithRelations;
  handleConfirmShareChanges: (shares: TrainingSetShares[]) => void;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const currMonth = `${new Date().getFullYear()}-${new Date().getMonth() + 1}`;
  const month = new Date().toLocaleString("default", { month: "long" });
  const currCosts = calculateCost(trainingSet.usage)[currMonth];
  const pendingCosts =
    !currCosts || currCosts.count === 0
      ? "No usage"
      : `$${(currCosts ?? { count: 0, cost: 0 }).cost.toFixed(2)}`;
  const currTokens =
    !currCosts || currCosts.count === 0
      ? ""
      : `(${(currCosts ?? { count: 0, cost: 0 }).count.toLocaleString()})`;
  return (
    <div className="h-auto p-2 px-4">
      <header className="flex justify-between border-b border-gray-400">
        <div>
          <h1 className="text-xl">{trainingSet.name}</h1>
          <div className="text-slate-500 mb-1">
            <small>
              {month} - {pendingCosts} {currTokens}
            </small>
          </div>
          {isShared ? (
            <div>
              <div className="flex flex-row">
                <div className=" mr-1 flex h-4 w-12  flex-row justify-center rounded-sm bg-amber-500 bg-opacity-80">
                  <ShareIcon fillColor="white" className="h-4 w-4" />
                </div>
                <small>Shared with you</small>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <Shares
          trainingSet={pendingData}
          onConfirmChanges={handleConfirmShareChanges}
        />
      </header>
      <Input
        disabled={!canEdit}
        className="mt-2 w-full rounded-md border border-slate-400 border-opacity-30 p-2"
        alt="Training Set Name"
        placeholder="Training Set Name"
        type="text"
        name="name"
        value={pendingData.name}
        onChange={handleNameChange}
      />
      <small>The name of the set</small>
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard trainingSet={trainingSet} />
      </Suspense>
    </div>
  );
};
