"use client";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { SpeakerIcon } from "~/app/components/SvgIcons";
import { ChatResponseMode } from "~/data/interfaces/types";

interface TypingIndicatorProps {
  phase: ChatResponseMode;
  onShown?: (visible: boolean) => void;
  show?: boolean;
}

export function TypingIndicator({ show, phase }: TypingIndicatorProps) {
  if (!show) return null;
  return (
    <div className="flex flex-row justify-start">
      <div className={twMerge(`mt-2 flex h-8 w-16 flex-row items-center justify-evenly rounded-lg bg-slate-500 `, phase === "one-shot" ? "w-10" : "")}>
        {phase !== "one-shot" && (
          <div className="ml-1 mr-[0.5px] flex h-6 w-6 animate-pulse flex-col justify-center rounded-full text-center text-white">
            {phase === "critique" && (
              <div className=" h-6 w-6 rounded-full bg-amber-500">C</div>
            )}
            {phase === "refine" && (
              <div className=" h-6 w-6 rounded-full bg-blue-400">R</div>
            )}
          </div>
        )}
        <div className="ml-1 h-2 w-2 animate-pulse rounded-full bg-white animation-delay-100"></div>
        <div className="h-2 w-2 animate-pulse rounded-full bg-white animation-delay-200"></div>
        <div className="mr-1 h-2 w-2 animate-pulse rounded-full bg-white animation-delay-300"></div>
      </div>
    </div>
  );
}

export function FakeSpeakerIndicator() {
  const bottomRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg- flex animate-pulse flex-row justify-start">
      <div className="mt-2 flex h-8 w-10 flex-row items-center justify-evenly rounded-lg bg-slate-500 text-white">
        <SpeakerIcon />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
