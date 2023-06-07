import { useFilePicker } from "use-file-picker";
import { memo, useCallback, useMemo, useState } from "react";
import { PlusAddIcon, TrashCan, UrlIcon } from "./SvgIcons";
import { isValidURL } from "~/utils/validation";
import { type TrainingSource } from "@prisma/client";
import Modal from "~/app/components/ModalDialog";
import DataClient from "~/utils/data-client";
import R2Client from "~/lib/R2Client";
import invariant from "tiny-invariant";
import Input from "~/app/components/Input";
import {
  type FileWithDirectoryAndFileHandle,
  directoryOpen,
} from "browser-fs-access";
import path from "path";
import delay from "~/utils/delay";
import { FolderIcon } from "~/app/components/SvgIcons";
import DeleteButton from "../../components/DeleteButton";

function Sources({
  sources,
  trainingSetId,
  onSourcesChanged,
  disabled,
}: {
  trainingSetId: string;
  sources: TrainingSource[];
  onSourcesChanged: (sources: Omit<TrainingSource, "trainingSetId">[]) => void;
  disabled?: boolean;
}) {
  invariant(process.env.NEXT_PUBLIC_BASE_URL, "NEXT_PUBLIC_BASE_URL");
  const [inProcessFiles, setInProcessFiles] = useState<
    {
      file: FileWithDirectoryAndFileHandle;
      status: "pending" | "complete" | "error";
    }[]
  >([]);

  const [showMore, setShowMore] = useState(false);
  const [showClearSourcesModal, setShowClearSourcesModal] = useState(false);

  const handleFileAdded = useCallback(
    async (file: FileWithDirectoryAndFileHandle) => {
      const fileName = file.webkitRelativePath || file.name;
      setInProcessFiles((prev) => [...prev, { file, status: "pending" }]);
      const parts = [trainingSetId, fileName].filter((p) => p.length > 0);
      const fileKey = parts.join("/");
      const { url } = await DataClient.getSignedUrl(fileKey);
      const final = `${fileKey}`;
      let response = await R2Client.uploadFile(url, file);
      let status: "pending" | "complete" | "error" = "pending";
      if (response.status > 201) {
        // Try again
        console.log("retrying", file);
        await delay(1000);
        response = await R2Client.uploadFile(url, file);
      }
      if (response.status > 201) {
        status = "error";
      } else {
        status = "complete";
      }
      setInProcessFiles((prev) =>
        prev.map((item) => {
          if (
            item.file.name === file.name &&
            item.file.directoryHandle?.name === file.directoryHandle?.name
          ) {
            return { file, status };
          }
          return item;
        })
      );
      return { url: final, file };
    },
    [trainingSetId]
  );

  const onFilesSelected = useCallback(
    (data: { plainFiles: FileWithDirectoryAndFileHandle[] }) => {
      const { plainFiles } = data;
      const chunked = plainFiles.reduce(
        (acc, file) => {
          const last = acc[acc.length - 1];
          if (last && last.length < 10) {
            last.push(file);
          } else {
            acc.push([file]);
          }
          return acc;
        },
        [[]] as FileWithDirectoryAndFileHandle[][]
      );
      Promise.all(
        // Use a timeout approach with the chunked files to avoid rate limiting
        chunked.map((chunk, index) => {
          return new Promise<
            { url: string; file: FileWithDirectoryAndFileHandle }[]
          >((resolve) => {
            setTimeout(() => {
              Promise.all(chunk.map(handleFileAdded))
                .then((files) => {
                  resolve(files);
                })
                .catch((err) => {
                  console.log("err", err);
                });
            }, index * 100);
          });
        })
      )
        .then((completedFiles) => {
          const files = completedFiles.flat();
          console.log("files", files);

          const updated: Omit<TrainingSource, "trainingSetId">[] = [...sources];

          files.forEach((file) => {
            const parts = [file.file.name, file.file.webkitRelativePath].filter(
              (p) => p.length > 0
            );
            const name = parts.join("/");
            let mimeType = file.file.type;
            if (file.file.name.endsWith(".md")) {
              mimeType = "text/markdown";
            }
            updated.push({
              name: name,
              content: file.url,
              type: "URL",
              createdAt: new Date(),
              updatedAt: new Date(),
              id: "",
              pending: true,
              mimeType: mimeType,
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
    [handleFileAdded, onSourcesChanged, sources]
  );

  const [openFileSelector] = useFilePicker({
    accept: [".txt", ".md", ".csv", ".json", ".html", ".pdf"],
    multiple: true,
    readFilesContent: false,
    onFilesSelected,
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

  const handleClearSources = useCallback(() => {
    onSourcesChanged([]);
    setShowClearSourcesModal(false);
  }, [onSourcesChanged]);

  const handleShowClearSourcesModal = useCallback(() => {
    if (sources.length > 0) {
      setShowClearSourcesModal(!showClearSourcesModal);
    }
  }, [showClearSourcesModal, sources.length]);

  const handleFolderOpenClick = useCallback(async () => {
    try {
      const blobsInDir = (await directoryOpen({
        recursive: true,
      })) as FileWithDirectoryAndFileHandle[];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/ban-ts-comment
      const filtered = blobsInDir.filter(
        (blob: FileWithDirectoryAndFileHandle) => {
          console.log("blob", blob);
          if (!Array.isArray(blob)) {
            const ext = path.extname(blob.name);
            return [".md", ".pdf", ".txt", ".html"].includes(ext);
          }
        }
      );

      onFilesSelected({
        plainFiles: filtered,
      });
    } catch (err) {}
  }, [onFilesSelected]);

  const isNewUrlValid = useMemo(() => {
    return isValidURL(newUrlText);
  }, [newUrlText]);

  const maxDisplayed = showMore ? sources.length : 20;

  return (
    <div className="rounded-lg">
      <h1 className="text-lg">Training Data Sources</h1>
      <div className="flex flex-row justify-between">
        <small>
          Training sources are external data you would like to use in model
          training. They can be text, markdown, or external urls.
        </small>
        <div>
          <button
            disabled={disabled}
            onClick={handleShowClearSourcesModal}
            className="text-blue-400"
          >
            <small>Clear</small>
          </button>
        </div>
      </div>
      <div className="rounded-lg border p-2">
        <header className="flex flex-row justify-between border-b border-dotted">
          <div>
            <span>{sources.length} Sources</span>
            {inProcessFiles.length > 0 && (
              <span className="ml-2 inline-block text-green-500">
                {inProcessFiles.filter((f) => f.status === "pending").length}{" "}
                Uploading
              </span>
            )}
          </div>
          <div className="flex w-auto flex-row justify-between" role="toolbar">
            <button
              disabled={disabled}
              className="mr-2 rounded bg-blue-400 p-2 shadow-md"
              onClick={openFileSelector}
            >
              <PlusAddIcon />
            </button>
            <button
              disabled={disabled}
              className="mr-2 rounded bg-blue-400 p-2 shadow-md"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={handleFolderOpenClick}
            >
              <FolderIcon />
            </button>
            <button
              disabled={disabled}
              className="rounded bg-blue-400 p-2 shadow-md"
              onClick={handleAddUrlClick}
            >
              <UrlIcon />
            </button>
          </div>
        </header>

        <ul className="max-h-72 w-full overflow-y-scroll">
          {inProcessFiles
            .sort((a, b) => {
              return a.file.name.localeCompare(b.file.name);
            })
            .map((file, index) => (
              <li key={index} className="flex flex-row justify-between">
                <div
                  className={`mt-1 flex flex-row ${
                    file.status === "pending"
                      ? "text-slate-400"
                      : file.status === "complete"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  <svg
                    aria-hidden="true"
                    className="mr-2 h-4 w-4 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
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
                  {file.file.directoryHandle?.name}/{file.file.name}
                </div>
              </li>
            ))}
          {sources
            .sort((a, b) => {
              return a.name.localeCompare(b.name);
            })
            .slice(0, maxDisplayed)
            .map((source, index) => (
              <li
                key={index}
                className={`mt-1 flex flex-row justify-between ${
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
                <DeleteButton
                  disabled={disabled}
                  onConfirmed={() => handleDelete(index)}
                  className="flex h-8 w-8 flex-row items-center justify-center rounded border-green-800 bg-blue-400 bg-opacity-50 hover:bg-opacity-90 "
                  confirmingClassName="flex flex-row items-center justify-center w-8 h-8 bg-red-400 bg-opacity-50 border-green-800 rounded hover:bg-opacity-90 "
                >
                  <TrashCan />
                </DeleteButton>
              </li>
            ))}
          {sources.length > 25 && (
            <li className="text-center">
              <button onClick={() => setShowMore(!showMore)}>
                Show {showMore ? "Less" : "More"}
              </button>
            </li>
          )}
        </ul>
        {/* <small>Pending {filesContent.length} sources</small>
        <ul>
          {filesContent.map((source, index) => (
            <li key={index}>{source.name}</li>
          ))}
        </ul> */}
      </div>
      <Modal
        title="Confirm clear all sources"
        closeText="Cancel"
        confirmText="Clear"
        icon={<TrashCan />}
        show={showClearSourcesModal}
        onCancel={handleShowClearSourcesModal}
        onConfirm={handleClearSources}
      >
        <p>
          Are you sure you want to clear all sources? This cannot be undone,
          once saved.
        </p>
      </Modal>
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

export default memo(Sources);
