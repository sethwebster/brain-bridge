import { type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return <input {...props} className={`rounded-md border-slate-500 bg-slate-100 dark:bg-slate-600 ${props.className || ""}`} />
}