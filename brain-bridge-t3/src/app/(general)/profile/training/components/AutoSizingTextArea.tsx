"use client";
import useAutosizeTextArea from "~/hooks/useAutoSizeTextArea";
import React, { useEffect, useRef, useState } from "react";

type AutoSizingTextAreaProps = {
  value: string;
  maxHeight?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const AutoSizingTextArea = React.forwardRef<
  HTMLTextAreaElement,
  AutoSizingTextAreaProps
>((props, forwardedRef) => {
  const firstLoad = useRef(true);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [deferred, setDeferred] = useState<boolean>(false);
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      setDeferred(true);
      return;
    }
  }, []);
  const ref =
    forwardedRef as unknown as React.MutableRefObject<HTMLTextAreaElement>;
  useAutosizeTextArea(
    // eslint-disable-next-line
    (ref ?? textRef).current,
    deferred ? props.value : "",
    props.maxHeight
  );
  const pps = {
    ...props,
  };
  delete pps.maxHeight;
  const additionalClassNames = props.disabled ? "bg-gray-200" : "";
  return (
    <textarea
      {...pps}
      className={`${props.className || ""} ${additionalClassNames}`}
      ref={forwardedRef ?? textRef}
      rows={1}
    />
  );
});

AutoSizingTextArea.displayName = "AutoSizingTextArea";

export default AutoSizingTextArea;
