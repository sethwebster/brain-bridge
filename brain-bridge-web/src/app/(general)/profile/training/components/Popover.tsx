import React, { useLayoutEffect } from "react";
import { twMerge } from "tailwind-merge";

export default function Popover({
  title,
  content,
  visible,
}: {
  visible?: boolean;
  title: string;
  content: string | React.ReactNode;
}) {
  const [canRender, setCanRender] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const offset = ref.current?.parentElement?.offsetTop ?? -1;
  useLayoutEffect(()=>{
    setCanRender(true);
  },[]);
  return (
    <div
      ref={ref}
      data-popover
      id="popover-default"
      role="tooltip"
      className={twMerge(
        `invisible b absolute z-10 inline-block w-64 rounded-lg border bg-blur-none border-gray-200 bg-white text-sm text-gray-500 shadow-md transition-all duration-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400`,
        ``,
        canRender && visible && offset > -1 ? "md:visible opacity-95 bg-blur-lg bg-slate-50" : "opacity-0"
      )}
      style={{
        top: (ref.current?.parentElement?.offsetTop ?? 0) + 100,
      }}
    >
      <div
        className={
          "rounded-t-lg border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
        }
      >
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <div className="px-3 py-2">{content}</div>
      <div data-popper-arrow></div>
    </div>
  );
}
