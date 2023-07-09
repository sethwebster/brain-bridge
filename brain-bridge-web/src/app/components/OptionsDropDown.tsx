"use client";
import React, { useCallback, useState } from "react";
import { type ChatResponseMode } from "~/data/interfaces/types";
import { twMerge } from "tailwind-merge";
import BooleanCheck from "./BooleanCheck";

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

  const oneShotSelectedCallback = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      handleModeSelect("one-shot");
    },
    [handleModeSelect]
  );
  const critiqueSelectedCallback = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      handleModeSelect("critique");
    },
    [handleModeSelect]
  );
  const refineSelectedCallback = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      handleModeSelect("refine");
    },
    [handleModeSelect]
  );

  return (
    <div className="z-10 mr-2" onMouseLeave={() => setDropDownOpen(false)}>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className={twMerge(
          `mr-2 inline-flex w-full rounded border-opacity-40 bg-blue-300 p-1.5 text-center text-sm font-medium text-white opacity-60 transition-all hover:bg-blue-300 focus:outline-none  focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`,
          dropDownOpen ? "justify-end opacity-90" : ""
        )}
        type="button"
        data-dropdown-trigger="{click}"
        onClick={() => setDropDownOpen(!dropDownOpen)}
        onMouseOver={() => setDropDownOpen(true)}
      >
        <div
          className={twMerge(
            "transition-all duration-200",
            dropDownOpen ? "opacity-100" : "w-0 opacity-0 hidden"
          )}
        >
          Options
        </div>
        <div
          className={twMerge(
            "transition-all duration-500",
            dropDownOpen ? "w-0 hidden opacity-0" : "opacity-100"
          )}
        >
          •••
        </div>
      </button>
      <div
        id="dropdown"
        className={twMerge(
          `z-10 w-44 divide-y divide-gray-100 overflow-hidden whitespace-nowrap rounded-md bg-white shadow transition-all dark:bg-gray-700`,
          dropDownOpen ? "h-auto w-44" : "h-0 w-0 opacity-0"
        )}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li className="">
            <button
              className="flex flex-row px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
              <BooleanCheck condition={selectedMode === "critique"} />
              Critique
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

export default React.memo(OptionsDropDown);