import React, { type InputHTMLAttributes } from "react";

type SelectProps = InputHTMLAttributes<HTMLSelectElement>;

function Select(props: SelectProps) {
  return (
    <select
      {...props}
      className={`rounded-md border-slate-500 bg-slate-100 dark:bg-slate-600  ${
        props.className || ""
      }`}
    >
      {props.children}
    </select>
  );
}


export default React.memo(Select);