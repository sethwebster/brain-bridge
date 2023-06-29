"use client";
//TODO: Figure out why this fails hydration when loaded directly
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import invariant from "tiny-invariant";
import useLocalStorage from "~/hooks/use-local-storage";
import { ClassNameValue, twMerge } from "tailwind-merge";
import {
  MdCheckCircle,
  MdClose,
  MdError,
  MdInfo,
  MdWarning,
} from "react-icons/md";
import { createHash } from "crypto";

function hash(str: string) {
  return createHash("sha256").update(str).digest("hex");
}

type InfoBoxTypes = "info" | "success" | "warning" | "error";

type InfoBoxProps = {
  title: string;
  body?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  type: InfoBoxTypes;
} & (
  | {
      children: React.ReactNode;
      body?: never;
    }
  | {
      children?: never;
      body: string;
    }
);

type TypeToItemMap<T extends string | React.ReactNode> = {
  [key in InfoBoxTypes]: T;
};

const typeToColorMap: TypeToItemMap<string> = {
  info: "bg-blue-100 dark:bg-gray-800 dark:text-blue-400 border-b-blue-500",
  success:
    "bg-green-100 dark:bg-gray-800 dark:text-green-400  border-b-green-500",
  warning:
    "bg-yellow-100 dark:bg-gray-800 dark:text-yellow-400 border-b-yellow-500",
  error: "bg-red-100 dark:bg-gray-800 dark:text-red-400 border-b-red-500",
};

const typeToIconMap: TypeToItemMap<React.ReactNode> = {
  info: <MdInfo size={22} color="rgba(84, 144, 247)" className="drop-shadow-sm" />,
  success: <MdCheckCircle size={22} color="#4BB543CC" className="drop-shadow-sm" />,
  warning: <MdWarning size={22} color="rgba(247, 204, 84)" className="drop-shadow-sm" />,
  error: <MdError size={22} color="rgba(247, 84, 84, .8)" className="drop-shadow-sm"/>,
};

export function DismissableInfoBox(
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
        className={`overflow-hidden transition-all ${
          !isMounted || dismissed === "dismissed" ? "max-h-0" : "max-h-44"
        }`}
      >
        <InfoBox {...newProps}>{wrappedWithDismissable}</InfoBox>
      </div>
    </>
  );
}

export default function InfoBox({
  title,
  children,
  icon,
  type,
  body,
}: InfoBoxProps) {
  return (
    <div
      className={twMerge(
        `mb-4 flex w-full flex-row rounded-sm border-b-2 p-4 text-sm shadow-md`,
        typeToColorMap[type]
      )}
      role="alert"
    >
      <div className="flex flex-col justify-center mr-2">
        {icon ?? typeToIconMap[type]}
      </div>
      <span className="sr-only">{type.toLocaleUpperCase()}</span>
      <div className="flex flex-col w-full">
        <h3 className="mb-1 font-semibold">{title}</h3>
        {children ?? body}
      </div>
    </div>
  );
}

/*
<svg
        aria-hidden="true"
        className="flex-shrink-0 inline w-5 h-5 mr-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        ></path>
      </svg>
*/
