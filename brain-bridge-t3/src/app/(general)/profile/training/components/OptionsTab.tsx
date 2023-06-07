"use client";
import Input from "~/app/components/Input";
import { type TrainingOptions } from "~/server/interfaces/types";

export function OptionsTab({
  canEdit, trainingOptions, handleTrainingOptionChanged,
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
      <div className="mb-4 flex flex-col">
        <label className="text-sm">Maximum Segment Length</label>
        <Input
          className="p-2"
          disabled={!canEdit}
          type="text"
          name="maxSegmentLength"
          value={trainingOptions.maxSegmentLength}
          placeholder="Enter a maximum segment length. Default is 2000."
          onChange={(e) => handleTrainingOptionChanged("maxSegmentLength", e)} />
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
          onChange={(e) => handleTrainingOptionChanged("overlapBetweenSegments", e)} />
        <small>
          This is the amount of overlap between each document segment when
          split.
        </small>
      </div>
    </div>
  );
}
