"use client";
import React, { type ReactNode, useState } from "react";

interface TabsProps {
  header?: string | ReactNode;
  tabContent: Record<string, ReactNode>;
  initialSelectedTab?: string;
  rightEnd?: ReactNode;
  additionalItems?: (string | ReactNode)[];
}

export default function Tabs({
  header,
  tabContent,
  initialSelectedTab,
  additionalItems,
  rightEnd,
}: TabsProps) {
  const firstTab = initialSelectedTab ?? Object.keys(tabContent)[0] ?? "";
  const [activeTab, setActiveTab] = useState(firstTab);
  return (
    <div className="h-full bg-slate-100">
      <div className="fixed top-20 z-10 w-full">
        <div className="z-40 flex w-full flex-row bg-slate-100 bg-opacity-60 text-center text-sm font-medium text-gray-500 shadow backdrop-blur-md backdrop-filter transition-all dark:border-gray-700 dark:bg-slate-600 dark:text-gray-400 ">
          <ul className="-mb-px flex flex-grow transition-all sm:flex-wrap ">
            <li className="mr-2 truncate p-4 hover:w-auto">{header}</li>
            {Object.keys(tabContent).map((tab) => (
              <li className="mr-2" key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300 ${
                    activeTab === tab
                      ? "border-gray-300 text-gray-600 dark:text-gray-300"
                      : ""
                  }`}
                >
                  {tab}
                </button>
              </li>
            ))}
            {additionalItems?.map((item, i) => (
              <li
                className="mr-2 truncate"
                key={`addtional${i}`}
              >
                {item}
              </li>
            )) ?? null}
          </ul>
          <ul>
            <li className="flex flex-row justify-end">
              <div className="mr-2 h-12 overflow-hidden p-2">{rightEnd}</div>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full bg-slate-100 h-auto dark:bg-slate-700">
        <div className="pt-16">
          {Object.keys(tabContent).map((tab) => (
            <div key={tab} className="w-full">
              {activeTab === tab ? tabContent[tab] : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
