import React, { useCallback } from "react";
import { twMerge as twm } from "tailwind-merge";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick: () => void;
  className?: string;
} & (
    | {
        label: string;
        children?: undefined;
      }
    | {
        children: React.ReactNode;
        label?: undefined;
      }
  );

export default function Button(props: ButtonProps) {
  const { onClick, className, label, children } = props;
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    },
    [onClick]
  );
  const combinedClassNameWithDarkStyles = twm(
    "shadow bg-blue-500 bg-opacity-90 enabled:hover:bg-opacity-100 text-white font-bold py-2 px-4 rounded-md disabled:bg-opacity-30 disabled:cursor-not-allowed",
    className
  );
  return (
    <button {...props} onClick={handleClick} className={combinedClassNameWithDarkStyles}>
      {label || children}
    </button>
  );
}

