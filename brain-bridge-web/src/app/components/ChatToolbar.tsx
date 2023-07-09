"use client";
import React from "react";
import { SpeakerIcon } from "~/app/components/SvgIcons";
import { EraseIcon } from "./SvgIcons";
import { type ChatResponseMode } from "~/data/interfaces/types";
import OptionsDropDown from "./OptionsDropDown";

interface ChatToolbarProps {
  soundEnabled: boolean;
  soundPending: boolean;
  onSoundEnabledClick: () => void;
  onClearChatClick: () => void;
  chatMode: ChatResponseMode;
  onModeSelectionChanged: (mode: ChatResponseMode) => void;
}
function ChatToolbar({
  chatMode,
  soundEnabled,
  onSoundEnabledClick,
  onClearChatClick,
  onModeSelectionChanged,
}: ChatToolbarProps) {
  return (
    <div className="flex w-full flex-row justify-end ">
      <div className="justify-right fixed z-30 flex flex-row p-2 ">
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

export default React.memo(ChatToolbar);