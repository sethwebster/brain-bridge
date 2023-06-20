"use client";
import { useCallback, useState } from "react";
import { SpeakerIcon } from "../(general)/profile/training/components/SvgIcons";
import { CheckMark, EraseIcon } from "./SvgIcons";
import { type ChatResponseMode } from "~/data/interfaces/types";

function BooleanCheck({ condition }: { condition: boolean }) {
  if (condition) {
    return (
      <div className="bg-blue-300">
        <CheckMark />
      </div>
    );
  }
  return <></>;
}

interface OptionsDropDownProps {
  selectedMode: ChatResponseMode;
  onModeChange: (mode: ChatResponseMode) => void;
}

function OptionsDropDown({ onModeChange, selectedMode }: OptionsDropDownProps) {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const handleModeSelect = useCallback(
    (mode: ChatResponseMode) => {
      onModeChange(mode);
    },
    [onModeChange]
  );

  const oneShotSelectedCallback = useCallback(() => {
    handleModeSelect("one-shot");
  }, [handleModeSelect]);
  const critiqueSelectedCallback = useCallback(() => {
    handleModeSelect("critique");
  }, [handleModeSelect]);
  const refineSelectedCallback = useCallback(() => {
    handleModeSelect("refine");
  }, [handleModeSelect]);

  return (
    <div className="mr-2">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className={`mr-2 inline-flex w-full rounded bg-blue-300 ${
          dropDownOpen ? "" : "bg-opacity-30"
        } border-opacity-40 p-1.5 text-center text-sm font-medium text-white hover:bg-blue-300 focus:outline-none  focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
          dropDownOpen ? "justify-end px-3.5" : "items-center"
        }`}
        type="button"
        data-dropdown-trigger="{click}"
        onClick={() => setDropDownOpen(!dropDownOpen)}
      >
        {dropDownOpen ? "Options" : "•••"}
      </button>
      <div
        id="dropdown"
        className={`z-10 ${
          dropDownOpen ? "" : "hidden"
        } w-44 divide-y divide-gray-100 rounded-md bg-white shadow dark:bg-gray-700`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li className="">
            <button
              className="flex flex-row  px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={oneShotSelectedCallback}
            >
              <BooleanCheck condition={selectedMode === "one-shot"} /> One Shot
            </button>
          </li>
          <li>
            <button
              onClick={critiqueSelectedCallback}
              className="flex flex-row px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <BooleanCheck condition={selectedMode === "critique"} />Critique
            </button>
          </li>
          <li>
            <button
              onClick={refineSelectedCallback}
              className="flex flex-row px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <BooleanCheck condition={selectedMode === "refine"} /> Refine
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

interface ChatToolbarProps {
  soundEnabled: boolean;
  soundPending: boolean;
  onSoundEnabledClick: () => void;
  onClearChatClick: () => void;
  chatMode: ChatResponseMode;
  onModeSelectionChanged: (mode: ChatResponseMode) => void;
}
export function ChatToolbar({
  chatMode,
  soundEnabled,
  onSoundEnabledClick,
  onClearChatClick,
  onModeSelectionChanged,
}: ChatToolbarProps) {
  return (
    <div className="flex w-full flex-row justify-end ">
      <div className="justify-right fixed z-50 flex flex-row p-2 ">
        <OptionsDropDown
          selectedMode={chatMode}
          onModeChange={onModeSelectionChanged}
        />
        <div>
          <button
            className={`mr-2 rounded bg-blue-300 bg-opacity-30 p-2 shadow hover:bg-opacity-80`}
            onClick={onClearChatClick}
          >
            <EraseIcon />
          </button>
        </div>
        <div>
          <button
            className={`${
              soundEnabled
                ? "bg-green-300 bg-opacity-30 hover:bg-opacity-80"
                : "bg-blue-300 bg-opacity-20 hover:bg-opacity-80"
            } rounded p-2 shadow`}
            onClick={onSoundEnabledClick}
          >
            <SpeakerIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
