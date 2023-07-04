"use client";

import { useEffect, useState } from "react";

export default function EnvironmentMarker() {
  const [environment, setEnvironment] = useState<
    "unknown" | "development" | "preview" | "production"
  >("unknown");

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
      setEnvironment("production");
    } else if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
      setEnvironment("preview");
    } else if (process.env.NODE_ENV === "development") {
      setEnvironment("development");
    }
  }, []);

  if (environment === "production" || environment === "unknown") {
    return <></>;
  }
  const Component =
    environment === "development" ? (
      <div className="absolute left-0 top-0 z-50 w-screen bg-blue-400 p-1 text-xs shadow-md text-slate-50">
        Environment: 🔧 {environment}
      </div>
    ) : (
      <div className="absolute left-0 top-0 z-50 w-screen bg-amber-400 p-1 text-xs shadow-md text-slate-700">
        Environment: 👓 {environment}
      </div>
    );
  return Component;
}
