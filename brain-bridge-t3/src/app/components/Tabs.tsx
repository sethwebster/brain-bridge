"use client";
import { ReactNode, useState } from "react";

interface TabsProps {
  tabContent: Record<string, ReactNode>;
}

export default function Tabs({ tabContent }: TabsProps) {
  const firstTab = Object.keys(tabContent)[0] ?? "";
  const [activeTab, setActiveTab] = useState(firstTab);

  return (
    <div className="fixed shadow z-50 w-full bg-slate-100 dark:invert border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
      <ul className="-mb-px flex flex-wrap">
        {Object.keys(tabContent).map((tab) => (
          <li className="mr-2" key={tab}>
            <a
              href="#"
              className="inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {tab}
            </a>
          </li>
        ))} 
      </ul>
    </div>
  );
}
