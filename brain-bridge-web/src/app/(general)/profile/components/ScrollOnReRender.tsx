"use client";
import { useEffect, useRef } from "react";

export function ScrollOnReRender() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      // block: "nearest",
      // inline: "start",
    });
  });
  return <div ref={ref} className="mb-40 h-6" />;
}
