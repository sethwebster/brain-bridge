"use client";
import { twMerge } from "tailwind-merge";
import {
  MdCheckCircle,
  MdError,
  MdInfo,
  MdWarning,
} from "react-icons/md";
import React from "react";

type InfoBoxTypes = "info" | "success" | "warning" | "error";

export type InfoBoxProps = {
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

function InfoBox({
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

export default React.memo(InfoBox);