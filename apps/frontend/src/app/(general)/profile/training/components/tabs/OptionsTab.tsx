"use client";
import React from "react";
import Input from "@/app/components/Input";
import Markdown from "@/app/components/Markdown";
import { type TrainingOptions } from "@/data/interfaces/types";

function OptionCard({
  canEdit,
  value,
  onChange,
  label,
  placeholder,
  description,
}: {
  canEdit: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  description: string;
}) {
  return (
    <div className="mb-4 flex flex-col rounded bg-slate-300 p-4 drop-shadow-md">
      <label className="text-sm">{label}</label>
      <Input
        className="p-2"
        disabled={!canEdit}
        type="text"
        name="maxSegmentLength"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      <small>
        <Markdown markdown={description} />
      </small>
    </div>
  );
}

function OptionsTab({
  canEdit,
  trainingOptions,
  handleTrainingOptionChanged,
}: {
  canEdit: boolean;
  trainingOptions: TrainingOptions;
  handleTrainingOptionChanged: (
    option: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}) {
  return (
    <div className="h-auto p-2 px-4">
      <h3 className="text-lg">Training Options</h3>
      <div className="grid md:grid-cols-3 md:gap-6">
        <OptionCard
          canEdit={canEdit}
          value={(trainingOptions.maxSegmentLength ?? "").toString()}
          onChange={(e) => handleTrainingOptionChanged("maxSegmentLength", e)}
          label="Maximum Segment Length"
          placeholder="Enter a maximum segment length. Default is 2000."
          description="This is the maximum length of each document segment when split."
        />
        <OptionCard
          canEdit={canEdit}
          value={(trainingOptions.overlapBetweenSegments ?? "").toString()}
          onChange={(e) =>
            handleTrainingOptionChanged("overlapBetweenSegments", e)
          }
          label="Document Overlap"
          placeholder="Enter a desired document overlap. Default is 200."
          description="This is the amount of overlap between each document segment when
          split."
        />
        <OptionCard
          canEdit={canEdit}
          value={(trainingOptions.numberOfNearestNeighbors ?? "").toString()}
          onChange={(e) =>
            handleTrainingOptionChanged("numberOfNearestNeighbors", e)
          }
          label="Number of Relevant Documents"
          placeholder="Enter the number of documents to return for each query. Default is 5."
          description={`This is the number of documents to send to the model for each query
          from the user. Lower numbers are faster and more cost conscious, but
          may result in less accurate results. A number too high may also result in a request
          over the token limit allowed.`}
        />
      </div>
    </div>
  );
}

export default React.memo(OptionsTab);
