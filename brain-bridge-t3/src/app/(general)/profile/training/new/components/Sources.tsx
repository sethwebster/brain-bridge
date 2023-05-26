import { useFilePicker } from "use-file-picker";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PlusAddIcon, UrlIcon } from "./SvgIcons";
import { isValidURL } from "~/utils/validation";
import htmlToMarkdown from "~/utils/html-to-markdown";
import { type TrainingSource } from "@prisma/client";
import Modal from "~/app/components/ModalDialog";

export default function Sources({
  sources,
  onSourcesChanged,
}: {
  sources: TrainingSource[];
  onSourcesChanged: (sources: Omit<TrainingSource, "trainingSetId">[]) => void;
}) {
  const [openFileSelector, { filesContent, clear }] = useFilePicker({
    accept: [".txt", ".md", ".csv", ".json", ".html"],
    multiple: true,
    readFilesContent: true,
  }) as [
    () => void,
    { filesContent: { name: string; content: string }[]; clear: () => void }
  ];
  const [newUrlText, setNewUrlText] = useState("");
  const [isAddingUrl, setIsAddingUrl] = useState(false);

  const handleAddUrlClick = useCallback(() => {
    setIsAddingUrl(true);
  }, []);

  const handleNewUrlTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewUrlText(e.target.value);
    },
    []
  );

  const handleConfirmNewUrl = useCallback(() => {
    setIsAddingUrl(false);
    setNewUrlText("");
    onSourcesChanged([
      ...sources,
      { type: "URL", name: newUrlText } as TrainingSource,
    ]);
  }, [newUrlText, onSourcesChanged, sources]);

  useEffect(() => {
    if (filesContent.length > 0) {
      const newSources: Omit<TrainingSource, "trainingSetId">[] =
        filesContent.map((fileContent) => {
          return {
            id: "",
            type: "FILE",
            createdAt: new Date(),
            updatedAt: new Date(),
            name: fileContent.name,
            content: htmlToMarkdown(fileContent.content),
            pending: true,
          };
        });
      clear();
      onSourcesChanged([...sources, ...newSources]);
    }
  }, [clear, filesContent, onSourcesChanged, sources]);

  const handleCancelNewUrl = useCallback(() => {
    setIsAddingUrl(false);
    setNewUrlText("");
  }, []);

  const handleDelete = useCallback(
    (index: number) => {
      const newSources = [...sources];
      newSources.splice(index, 1);
      onSourcesChanged(newSources);
    },
    [onSourcesChanged, sources]
  );

  const isNewUrlValid = useMemo(() => {
    return isValidURL(newUrlText);
  }, [newUrlText]);

  return (
    <div className="p-4 mt-2 rounded-lg">
      <h1 className="text-lg">Training Data Sources</h1>
      <small>
        Training sources are external data you would like to use in model
        training. They can be text, markdown, or external urls.
      </small>
      <div className="p-2 border border-dashed rounded-lg">
        <header className="flex flex-row justify-between border-b border-dotted">
          <div>{sources.length} Sources</div>
          <div className="">
            <button
              className="p-2 mr-2 bg-blue-400 rounded shadow-md"
              onClick={openFileSelector}
            >
              <PlusAddIcon />
            </button>
            <button
              className="p-2 bg-blue-400 rounded shadow-md"
              onClick={handleAddUrlClick}
            >
              <UrlIcon />
            </button>
          </div>
        </header>
        <ul>
          {sources.map((source, index) => (
            <li
              key={index}
              className={`flex flex-row justify-between ${
                source.id.length === 0 ? "text-gray-500" : ""
              }`}
            >
              <div>
                {source.type === "URL" && (
                  <>
                    <div className="w-4 h-4">
                      <UrlIcon />
                    </div>
                    <a
                      href={source.name}
                      className="text-blue-500"
                      target="_blank"
                      referrerPolicy="no-referrer"
                    >
                      {source.name}
                    </a>
                  </>
                )}
                {source.type === "FILE" && (
                  <a href={source.name}>{source.name}</a>
                )}
                {source.id.length === 0 && (
                  <>
                    <small> (pending)</small>
                  </>
                )}
              </div>
              <button onClick={() => handleDelete(index)}>delete</button>
            </li>
          ))}
        </ul>
        {/* <small>Pending {filesContent.length} sources</small>
        <ul>
          {filesContent.map((source, index) => (
            <li key={index}>{source.name}</li>
          ))}
        </ul> */}
      </div>
      <Modal
        title="Add an external source"
        closeText="Cancel"
        confirmText="Add"
        icon={<UrlIcon />}
        show={isAddingUrl}
        onConfirm={handleConfirmNewUrl}
        onCancel={handleCancelNewUrl}
      >
        <input
          type="url"
          className="w-full p-2"
          autoFocus
          onChange={handleNewUrlTextChange}
        />
        {isNewUrlValid ? (
          <small className="text-green-500">Looks good!</small>
        ) : (
          <small className="text-red-500">Enter a valid url</small>
        )}
      </Modal>
    </div>
  );
}
