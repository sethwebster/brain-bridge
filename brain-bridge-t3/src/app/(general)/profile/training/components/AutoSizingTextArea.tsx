"use client";
import useAutosizeTextArea from "~/hooks/useAutoSizeTextArea";
import { useEffect, useRef, useState } from "react";

export function AutoSizingTextArea(
  props: {
    value: string;
    maxHeight?: number;
  } & React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
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
  useAutosizeTextArea(ref.current, deferred ? props.value : "", props.maxHeight);
  const pps = {
    ...props
  }
  delete pps.maxHeight;
  const additionalClassNames = props.disabled ? "bg-gray-200" : "";
  return (
    <textarea
      {...pps}
      className={`${props.className || ""} ${additionalClassNames}`}
      ref={ref}
    />
  );
}
