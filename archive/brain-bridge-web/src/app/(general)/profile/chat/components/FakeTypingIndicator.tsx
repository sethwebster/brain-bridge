"use client";
import { generateRandomInteger } from "@/utils/numbers";
import { useCallback, useEffect, useRef, useState } from "react";
import { SpeakerIcon } from "../../training/new/components/SvgIcons";

interface FaceTypingIndicatorProps {
  onShown?: (visible: boolean) => void;
  show?: boolean;
}

export function FakeTypingIndicator({
  onShown,
  show,
}: FaceTypingIndicatorProps) {
  const [visible, setVisible] = useState(false);

  const setVisibleAndNotify = useCallback((val: boolean) => {
    setVisible(val);
    onShown?.(val);
  }, [onShown]);

  useEffect(() => {
    if (!show) {
      setVisibleAndNotify(false);
      return;
    }
    const i = setTimeout(() => {
      setVisibleAndNotify(true);
    }, generateRandomInteger(1000, 5000));
    return () => {
      clearTimeout(i);
      setVisibleAndNotify(false);
    };
  }, [setVisibleAndNotify, show]);
  if (!visible) return <> </>;
  return (
    <div className="flex flex-row justify-start">
      <div className="flex flex-row items-center w-10 h-8 mt-2 rounded-lg justify-evenly bg-slate-500 ">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}

export function FakeSpeakerIndicator() {
  const bottomRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-row justify-start animate-pulse bg-">
      <div className="flex flex-row items-center w-10 h-8 mt-2 text-white rounded-lg justify-evenly bg-slate-500">
        <SpeakerIcon />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
