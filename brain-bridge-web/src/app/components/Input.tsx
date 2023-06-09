import React, { type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={twMerge(
        `rounded-md border-slate-500 bg-slate-100 shadow-inner dark:bg-slate-600 p-2`,
        `${props.className || ""}`
      )}
    />
  );
}

export default React.memo(Input)