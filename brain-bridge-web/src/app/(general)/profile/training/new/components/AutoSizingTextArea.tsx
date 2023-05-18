"use client";
import useAutosizeTextArea from "@/hooks/useAutoSizeTextArea";
import { useState, useRef, useEffect } from "react";

export function AutoSizingTextArea(
  props: { value: string; } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const firstLoad = useRef(true);
  const ref = useRef<HTMLTextAreaElement>(null);
  const [deferred, setDeferred] = useState<boolean>(false);
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      setDeferred(true);
      return;
    }
  }, []);
  useAutosizeTextArea(ref.current, deferred ? props.value : "", 500);
  return <textarea {...props} ref={ref} />;
}
