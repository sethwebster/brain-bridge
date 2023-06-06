"use client";
import React, { type ReactNode, useState } from "react";

interface TabsProps {
  header?: string | ReactNode;
  tabContent: Record<string, ReactNode>;
  initialSelectedTab?: string;
  rightEnd?: ReactNode;
}

export default function Tabs({
  header,
  tabContent,
  initialSelectedTab,
  rightEnd,
}: TabsProps) {
  const firstTab = initialSelectedTab ?? Object.keys(tabContent)[0] ?? "";
  const [activeTab, setActiveTab] = useState(firstTab);
  return (
    <div>
      <div className="fixed sm:w-5/6">
        <div className="z-50 flex w-full flex-row  bg-slate-100 text-center text-sm font-medium text-gray-500 shadow transition-all dark:border-gray-700 dark:text-gray-400 dark:invert">
          <ul className="-mb-px flex flex-grow flex-wrap transition-all ">
            <li className="mr-2 p-4 hover:w-auto truncate">{header}</li>
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
          </ul>
          <ul>
            <li className="flex flex-row justify-end">
              <div className="p-2 h-12 overflow-hidden mr-2">{rightEnd}</div>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full">
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
