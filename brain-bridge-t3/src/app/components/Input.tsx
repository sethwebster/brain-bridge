import { type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={twMerge(
        `rounded-md border-slate-500 bg-slate-100 shadow-inner dark:bg-slate-600`,
        `${props.className || ""}`
      )}
    />
  );
}
