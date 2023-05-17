"use client";
import { generateRandomInteger } from "@/utils/numbers";
import { useEffect, useRef, useState } from "react";
import { SpeakerIcon } from "../../training/new/components/svg-icons";

export function FakeTypingIndicator() {
  const [show, setShow] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const i = setTimeout(() => {
      setShow(true);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, generateRandomInteger(1000, 5000));
    return () => {
      clearTimeout(i);
      setShow(false);
    };
  }, []);
  if (!show) return <> </>;
  return (
    <div className="flex flex-row justify-start">
      <div className="flex flex-row items-center w-10 h-8 mt-2 rounded-lg justify-evenly bg-slate-500 ">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
      </div>
      <div ref={bottomRef} />
    </div>
  );
}

export function FakeSpeakerIndicator() {
  const [show, setShow] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const i = setTimeout(() => {
      setShow(true);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, generateRandomInteger(1000, 5000));
    return () => {
      clearTimeout(i);
      setShow(false);
    };
  }, []);
  if (!show) return <> </>;
  return (
    <div className="flex flex-row justify-start animate-pulse bg-">
      <div className="flex flex-row items-center w-10 h-8 mt-2 text-white rounded-lg justify-evenly bg-slate-500">
        <SpeakerIcon />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
