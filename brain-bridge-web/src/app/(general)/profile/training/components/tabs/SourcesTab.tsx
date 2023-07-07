import { useFilePicker } from "use-file-picker";
import React, { useCallback, useMemo, useState } from "react";
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
import {
  DownloadIcon,
  FolderIcon,
  PlusAddIcon,
  Spinner,
  TrashCan,
  UrlIcon,
} from "~/app/components/SvgIcons";
import * as R from "ramda";
import { saveAs } from "file-saver";
import JsZip from "jszip";
import { extension } from "mime-types";
import { toast } from "react-toastify";
import DeleteButton from "~/base-components/DeleteButton";
import Logger from "~/lib/logger";
import AutoSizingTextArea from "../../../../../../base-components/AutoSizingTextArea";
import { MdCheck } from "react-icons/md";
import { twMerge } from "tailwind-merge";

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
      const fileName =
        file.webkitRelativePath.length > 0
          ? file.webkitRelativePath
          : file.name;
      setInProcessFiles((prev) => [...prev, { file, status: "pending" }]);
      const parts = [trainingSetId, fileName].filter((p) => p.length > 0);
      const fileKey = parts.join("/");
      const { url } = await DataClient.getSignedUrl(fileKey, trainingSetId);
      const final = `${fileKey}`;
      let response = await R2Client.uploadFile(url, file);
      let status: "pending" | "complete" | "error" = "pending";
      if (response.status > 201) {
        // Try again
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
                .catch((err: { message: string }) => {
                  Logger.error("err", err);
                  toast.error(`Error uploading file: ${err.message}`);
                });
            }, index * 100);
          });
        })
      )
        .then((completedFiles) => {
          const files = completedFiles.flat();
          const updated: Omit<TrainingSource, "trainingSetId">[] = [...sources];

          files.forEach((file) => {
            const name =
              file.file.webkitRelativePath.length > 0
                ? file.file.webkitRelativePath
                : file.file.name;
            let mimeType = file.file.type;
            const ext = path.extname(file.file.name);
            switch (ext) {
              case ".txt":
                mimeType = "text/plain";
                break;
              case ".md":
                mimeType = "text/markdown";
                break;
              case ".csv":
                mimeType = "text/csv";
                break;
              case ".json":
                mimeType = "application/json";
                break;
              case ".html":
                mimeType = "text/html";
                break;
              case ".pdf":
                mimeType = "application/pdf";
                break;
            }

            updated.push({
              name: name,
              type: "URL",
              createdAt: new Date(),
              updatedAt: new Date(),
              id: "",
              pending: true,
              mimeType: mimeType,
            });
          });
          const deduplicated = R.uniqBy(R.prop("name"), updated);
          onSourcesChanged(deduplicated);
          setInProcessFiles([]);
        })
        .catch((err) => {
          Logger.error("err", err);
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
  const [newUrlText, setNewUrlText] = useState<string[]>([]);
  const [isAddingUrl, setIsAddingUrl] = useState(false);

  const handleAddUrlClick = useCallback(() => {
    setIsAddingUrl(true);
  }, []);

  const handleNewUrlTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const urls = e.target.value
        .split("\n")
        .filter((s) => s.trim().length > 0);
      setNewUrlText(urls);
    },
    []
  );

  const handleConfirmNewUrl = useCallback(() => {
    setIsAddingUrl(false);
    setNewUrlText([]);
    const newSources = [
      ...sources,
      ...newUrlText.map(
        (url) => ({ type: "URL", name: url } as TrainingSource)
      ),
    ]
      // deduplicate sources
      .filter((source, index, self) => {
        return (
          self.findIndex(
            (s) => s.name === source.name && s.type === source.type
          ) === index
        );
      });
    onSourcesChanged(newSources);
  }, [newUrlText, onSourcesChanged, sources]);

  const handleCancelNewUrl = useCallback(() => {
    setIsAddingUrl(false);
    setNewUrlText([]);
  }, []);

  const handleDelete = useCallback(
    (source: TrainingSource) => {
      const newSources = sources.filter((s) => s.name !== source.name);
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

  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setSearchText(e.currentTarget.value);
    },
    []
  );

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadClick = useCallback(() => {
    const downloadAndZipFiles = async () => {
      try {
      setIsDownloading(true);
      const sourcePromises = sources.map((source) => {
        invariant(process.env.NEXT_PUBLIC_BASE_URL, "Base URL is required");
        const item =
          source.name.length > 0 && source.name.startsWith("http")
            ? `web?url=${source.name}`
            : `${trainingSetId}/${source.name}`;
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/files/${item}`;
        return fetch(url).then((res) => {
          return {
            source,
            blob: res.blob(),
            type: res.headers.get("content-type"),
          };
        });
      }, []);

      const chunked = R.splitEvery(10, sourcePromises);

      const fetchResults = await Promise.all(
        chunked.map(async (chunk, index) => {
          await delay(index * 100);
          return await Promise.all(chunk);
        })
      );

      const blobs = fetchResults.flat();

      const zip = JsZip();
      blobs.forEach((item) => {
        const dir = path.dirname(item.source.name);
        const name = path.basename(item.source.name);
        let ext = path.extname(name);
        if (ext.length === 0 && item.type) {
          const resolvedExt = extension(item.type);
          if (resolvedExt) {
            ext = `.${resolvedExt}`;
          }
        }

        zip.file(
          `${dir}/${name.replace(`.${ext}`, "")}${ext}`
            .replace("http://", "")
            .replace("https://", ""),
          item.blob
        );
      });
      await zip.generateAsync({ type: "blob" }).then((zipFile) => {
        const currentDate = new Date().getTime();
        const fileName = `training-set-data-${currentDate}.zip`;
        saveAs(zipFile, fileName);
      });
    } catch(e: unknown) {
      if (e instanceof Error) {
        Logger.error('Download Error: ', e.message)
      }
    } finally {
      setIsDownloading(false);
    }
    };
    downloadAndZipFiles().catch((err: { message: string }) => {
      toast.error(err.message);
    });
  }, [sources, trainingSetId]);

  const isNewUrlValid = useMemo(() => {
    const allValid = newUrlText.every((url) => isValidURL(url));
    return allValid;
  }, [newUrlText]);

  const maxDisplayed = showMore ? sources.length : 20;
  const filteredSources = useMemo(() => {
    return sources
      .filter((source) => {
        if (searchText.length > 0) {
          return source.name.toLowerCase().includes(searchText.toLowerCase());
        }
        return true;
      })
      .sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
  }, [searchText, sources]);
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
        <header className="flex flex-row justify-between border-b border-dotted pb-2">
          <div className="mr-2 flex-grow">
            <Input
              value={searchText}
              placeholder="Filter sources"
              onChange={handleSearchTextChange}
              className="w-full rounded-md p-1 shadow outline-none drop-shadow"
            />
          </div>
          <div className="mr-2 rounded bg-blue-200 px-2 shadow">
            <div className="pt-1">{filteredSources.length} Sources</div>
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
              className="mr-2 rounded bg-blue-400 p-2 shadow-md"
              onClick={handleAddUrlClick}
            >
              <UrlIcon />
            </button>
            <button
              title="Download Sources (only files)"
              disabled={disabled}
              className={twMerge(`rounded bg-blue-400 p-2 shadow-md`,isDownloading ? 'animate-pulse bg-amber-400' :'')}
              onClick={handleDownloadClick}
            >
              <DownloadIcon />
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
                  {file.status === "pending" && <Spinner />}
                  {file.status === "complete" && (
                    <MdCheck color="green" className="mr-2" />
                  )}
                  {file.file.directoryHandle?.name}/{file.file.name}
                </div>
              </li>
            ))}
          {filteredSources.slice(0, maxDisplayed).map((source, index) => (
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
                        source.name.startsWith("http")
                          ? source.name
                          : process.env.NEXT_PUBLIC_BASE_URL || ""
                      }/api/files/${trainingSetId}/${source.name}`}
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
                onConfirmed={() => handleDelete(source)}
                className="m-0 flex h-8 w-8 flex-row items-center justify-center p-0 opacity-90"
                confirmingClassName="w-8 h-8 bg-red-400 items-center flex flex-row p-0 m-0 justify-center opacity-90"
              />
            </li>
          ))}
          {filteredSources.length > 25 && (
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
        <AutoSizingTextArea
          className="w-full p-2"
          autoFocus
          value={newUrlText.join("\n")}
          onChange={handleNewUrlTextChange}
        />
        {isNewUrlValid ? (
          <small className="text-green-500">Looks good!</small>
        ) : (
          <small className="text-red-500">
            Enter a valid url (one per line)
          </small>
        )}
      </Modal>
    </div>
  );
}

export default React.memo(Sources);
