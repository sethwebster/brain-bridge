"use client";
import React, { useCallback, useEffect, useState } from "react";
import useLocalStorage from "@/hooks/use-local-storage";
import { MdClose } from "react-icons/md";
import InfoBox, { type InfoBoxProps } from "./InfoBox";


function DismissableInfoBox(
  props: InfoBoxProps & {
    dismissable?: boolean;
    dismissableId: string;
  }
) {
  const [dismissed, setDismissed, wasUndefined, isServer] = useLocalStorage<
    "dismissed" | undefined | null
  >(props.dismissableId, undefined);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDismiss = useCallback(() => {
    setDismissed("dismissed");
  }, [setDismissed]);

  /* Wrap the children in a div so that we can add the dismissable button */
  const content = props.children ?? <div>{props.body}</div>;
  const wrappedWithDismissable = (
    <div className="flex flex-row w-full">
      <div className="flex-grow">{content}</div>
      {props.dismissable && (
        <button
          className="relative ml-2 text-gray-500 -top-3 hover:text-gray-700"
          onClick={handleDismiss}
        >
          <MdClose size={16} />
        </button>
      )}
    </div>
  );

  const newProps = {
    ...props,
    children: wrappedWithDismissable,
    body: undefined,
  };

  console.log(
    "dismissed",
    dismissed,
    "wasUndefined",
    wasUndefined,
    "isServer",
    isServer
  );

  return (
    <>
      {/* {wasUndefined === true ? "wasUndefined" : "wasDefined"} {isServer ? "isServer" : "isClient"} {dismissed ? "dismissed" : "notDismissed"} */}
      <div
        suppressHydrationWarning={true}
        className={`overflow-hidden transition-all ${!isMounted || dismissed === "dismissed" ? "max-h-0" : "max-h-44"}`}
      >
        <InfoBox {...newProps}>{wrappedWithDismissable}</InfoBox>
      </div>
    </>
  );
}

export default React.memo(DismissableInfoBox);
