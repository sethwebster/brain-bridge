"use client";
import { SpeakerIcon } from "../(general)/profile/training/new/components/SvgIcons";

interface ChatToolbarProps {
  soundEnabled: boolean;
  soundPending: boolean;
  onSoundEnabledClick: () => void;
}
export function ChatToolbar({ soundEnabled, onSoundEnabledClick }: ChatToolbarProps) {
  return (
    <div className="flex flex-row justify-end w-full ">
      <div className="fixed z-50 flex flex-row p-2 justify-right ">
        <button
          className={`${soundEnabled
              ? "bg-green-300 bg-opacity-30 hover:bg-opacity-80"
              : "bg-blue-300 bg-opacity-20 hover:bg-opacity-80"} p-2 rounded shadow`}
          onClick={onSoundEnabledClick}
        >
          <SpeakerIcon />
        </button>
      </div>
    </div>
  );
}
