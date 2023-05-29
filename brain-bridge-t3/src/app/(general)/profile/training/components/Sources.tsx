import { useFilePicker } from "use-file-picker";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PlusAddIcon, UrlIcon } from "./SvgIcons";
import { isValidURL } from "~/utils/validation";
import htmlToMarkdown from "~/utils/html-to-markdown";
import { type TrainingSource } from "@prisma/client";
import Modal from "~/app/components/ModalDialog";
import DataClient from "~/utils/data-client";
import R2Client from "~/lib/R2Client";
import invariant from "tiny-invariant";

export default function Sources({
  sources,
  trainingSetId,
  onSourcesChanged,
}: {
  trainingSetId: string;
  sources: TrainingSource[];
  onSourcesChanged: (sources: Omit<TrainingSource, "trainingSetId">[]) => void;
}) {
  invariant(process.env.NEXT_PUBLIC_BASE_URL, "NEXT_PUBLIC_BASE_URL");
  const handleFileAdded = useCallback(
    async (file: File) => {
      const fileKey = `${trainingSetId}/${file.name}`;
      const { url } = await DataClient.getSignedUrl(fileKey);
      const final = `${fileKey}`;
      await R2Client.uploadFile(url, file);
      return { url: final, file };
    },
    [trainingSetId]
  );

  const [openFileSelector, { filesContent, clear }] = useFilePicker({
    accept: [".txt", ".md", ".csv", ".json", ".html"],
    multiple: true,
    readFilesContent: false,
    onFilesSelected(data: { plainFiles: File[] }) {
      const { plainFiles } = data;
      Promise.all(
        plainFiles.map(async (file) => {
          return handleFileAdded(file);
        })
      )
        .then((files) => {
          console.log("files", files);
          const updated: Omit<TrainingSource, "trainingSetId">[] = [...sources];
          files.forEach((file) => {
            updated.push({
              name: file.file.name,
              content: file.url,
              type: "URL",
              createdAt: new Date(),
              updatedAt: new Date(),
              id: "",
              pending: true,
              mimeType: file.file.type,
            });
          });

          onSourcesChanged(updated);
        })
        .catch((err) => {
          console.log("err", err);
        });
      return true;
    },
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
      { type: "URL", name: newUrlText, content: "" } as TrainingSource,
    ]);
  }, [newUrlText, onSourcesChanged, sources]);

  useEffect(() => {
    if (filesContent.length > 0) {
      console.log("filesContent", filesContent);
      const newSources: Omit<TrainingSource, "trainingSetId">[] =
        filesContent.map((fileContent) => {
          return {
            id: "",
            type: "URL",
            createdAt: new Date(),
            updatedAt: new Date(),
            name: fileContent.name,
            content: htmlToMarkdown(fileContent.content),
            pending: true,
            mimeType: "text/markdown",
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
    <div className="mt-2 rounded-lg p-4">
      <h1 className="text-lg">Training Data Sources</h1>
      <small>
        Training sources are external data you would like to use in model
        training. They can be text, markdown, or external urls.
      </small>
      <div className="rounded-lg border border-dashed p-2">
        <header className="flex flex-row justify-between border-b border-dotted">
          <div>{sources.length} Sources</div>
          <div className="">
            <button
              className="mr-2 rounded bg-blue-400 p-2 shadow-md"
              onClick={openFileSelector}
            >
              <PlusAddIcon />
            </button>
            <button
              className="rounded bg-blue-400 p-2 shadow-md"
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
                !source.id || source.id.length === 0 ? "text-gray-500" : ""
              }`}
            >
              <div className="mt-1 flex flex-row">
                {source.type === "URL" && (
                  <>
                    <div className="mr-2 rounded border border-slate-200 bg-slate-400 p-1">
                      <div className="h-4 w-4">
                        <UrlIcon />
                      </div>
                    </div>
                    <a
                      href={`${
                        process.env.NEXT_PUBLIC_BASE_URL || ""
                      }/api/files/${source.content}`}
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
                {!source.id ||
                  (source.id.length === 0 && (
                    <>
                      <small> (pending)</small>
                    </>
                  ))}
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
