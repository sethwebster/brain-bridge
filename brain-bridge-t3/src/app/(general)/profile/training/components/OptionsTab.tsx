"use client";
import Input from "~/app/components/Input";
import { type TrainingOptions } from "~/data/interfaces/types";

export function OptionsTab({
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
      <div className="mb-4 flex flex-col">
        <label className="text-sm">Relevant Document Count</label>
        <Input
          className="p-2"
          disabled={!canEdit}
          type="text"
          name="numberOfNearestNeighbors"
          value={trainingOptions.numberOfNearestNeighbors}
          placeholder="Enter a number of relevant documents. Default is 2."
          onChange={(e) => handleTrainingOptionChanged("numberOfNearestNeighbors", e)}
        />
        <small>
          This is the number of documents to send to the model for each query
          from the user. Lower numbers are faster and more cost conscious, but
          may result in less accurate results.

          <strong>Note:</strong>A number too high may also result in a request over the token limit allowed.
        </small>
      </div>
    </div>
  );
}
