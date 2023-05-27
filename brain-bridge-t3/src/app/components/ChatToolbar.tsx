"use client";
import { SpeakerIcon } from "../(general)/profile/training/new/components/SvgIcons";
import { EraseIcon } from "./SvgIcons";

interface ChatToolbarProps {
  soundEnabled: boolean;
  soundPending: boolean;
  onSoundEnabledClick: () => void;
  onClearChatClick: () => void;
}
export function ChatToolbar({
  soundEnabled,
  onSoundEnabledClick,
  onClearChatClick,
}: ChatToolbarProps) {
  return (
    <div className="flex w-full flex-row justify-end ">
      <div className="justify-right fixed z-50 flex flex-row p-2 ">
        <button className={`rounded p-2 shadow mr-2 hover:bg-opacity-80 bg-blue-300 bg-opacity-30`} onClick={onClearChatClick}>
          <EraseIcon />
        </button>
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
  );
}
