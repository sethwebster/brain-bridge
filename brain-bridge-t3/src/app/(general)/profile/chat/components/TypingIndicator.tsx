"use client";
import { useRef } from "react";
import { SpeakerIcon } from "~/app/components/SvgIcons";

interface TypingIndicatorProps {
  onShown?: (visible: boolean) => void;
  show?: boolean;
}

export function TypingIndicator({ show }: TypingIndicatorProps) {
  if (!show) return null;
  return (
    <div className="flex flex-row justify-start">
      <div className="mt-2 flex h-8 w-10 flex-row items-center justify-evenly rounded-lg bg-slate-500 ">
        <div className="h-2 w-2 animate-pulse rounded-full bg-white"></div>
        <div className="h-2 w-2 animate-pulse rounded-full bg-white"></div>
        <div className="h-2 w-2 animate-pulse rounded-full bg-white"></div>
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
