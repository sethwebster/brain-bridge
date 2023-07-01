"use client";
import React, { Suspense } from "react";
import Input from "~/app/components/Input";
import { type TrainingSetShares } from "@prisma/client";
import { type TrainingSetWithRelations } from "~/data/interfaces/types";
import Shares from "../Shares";
import { ShareIcon } from "~/app/components/SvgIcons";
import Dashboard from "../Dashboard";
import { calculateCost } from "../../../../../../lib/calculate-costs";
import { MdShare } from "react-icons/md";

function SharedWithYouTag({shared}:{shared: boolean}) {
  if (!shared) return <></>
  return (<div>
    <div className="flex flex-row">
      <MdShare color="gray" size={12} className="mt-[3.5px] mr-1" />
      <small>Shared with you</small>
    </div>
  </div>)
}

const DetailsTab = ({
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
          <div className="mb-1 text-slate-500">
            <small>
              {month} - {pendingCosts} {currTokens}
            </small>
          </div>
          <SharedWithYouTag shared={isShared} />
        </div>
        <Shares
          trainingSet={pendingData}
          onConfirmChanges={handleConfirmShareChanges}
        />
      </header>
      <Input
        disabled={!canEdit}
        className="w-full p-2 mt-2 border rounded-md border-slate-400 border-opacity-30"
        alt="Training Set Name"
        placeholder="Training Set Name"
        type="text"
        name="name"
        value={pendingData.name}
        onChange={handleNameChange}
      />
      <small>The name of the set</small>
      <Suspense fallback={<></>}>
        <Dashboard trainingSet={trainingSet} />
      </Suspense>
    </div>
  );
};

export default React.memo(DetailsTab);
