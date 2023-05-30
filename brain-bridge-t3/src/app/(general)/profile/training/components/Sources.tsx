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
import Input from "~/app/components/Input";

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
  const [inProcessFiles, setInProcessFiles] = useState<
    { file: File; status: "pending" | "complete" }[]
  >([]);
  const handleFileAdded = useCallback(
    async (file: File) => {
      setInProcessFiles((prev) => [...prev, { file, status: "pending" }]);
      const fileKey = `${trainingSetId}/${file.name}`;
      const { url } = await DataClient.getSignedUrl(fileKey);
      const final = `${fileKey}`;
      await R2Client.uploadFile(url, file);
      setInProcessFiles((prev) =>
        prev.map((item) => {
          if (item.file.name === file.name) {
            return { file, status: "complete" };
          }
          return item;
        })
      );
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
          setInProcessFiles([]);
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
          {inProcessFiles.map((file, index) => (
            <li key={index} className="flex flex-row justify-between">
              <div
                className={`mt-1 flex flex-row ${
                  file.status === "pending"
                    ? "text-slate-400"
                    : "text-green-400"
                }`}
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 mr-2 text-gray-200 animate-spin fill-blue-600 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                {file.file.name}
              </div>
            </li>
          ))}
          {sources.map((source, index) => (
            <li
              key={index}
              className={`flex flex-row justify-between ${
                !source.id || source.id.length === 0 ? "text-gray-500" : ""
              }`}
            >
              <div className="flex flex-row mt-1">
                {source.type === "URL" && (
                  <>
                    <div className="p-1 mr-2 border rounded border-slate-200 bg-slate-400">
                      <div className="w-4 h-4">
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
        <Input
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
