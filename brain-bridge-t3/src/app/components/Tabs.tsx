"use client";
import React, { type ReactNode, useState, useCallback } from "react";
import { MdMenu } from "react-icons/md";

interface TabsProps {
  header?: string | ReactNode;
  tabContent: Record<string, ReactNode>;
  initialSelectedTab?: string;
  rightEnd?: ReactNode;
  additionalItems?: (string | ReactNode)[];
  onSelectNewTab?: (tab: string) => void;
}

export default function Tabs({
  header,
  tabContent,
  initialSelectedTab,
  additionalItems,
  rightEnd,
  onSelectNewTab,
}: TabsProps) {
  const firstTab = initialSelectedTab ?? Object.keys(tabContent)[0] ?? "";
  const [activeTab, setActiveTab] = useState(firstTab);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleTabSelect = useCallback(
    (tab: string) => {
      onSelectNewTab?.(tab) ?? setActiveTab(tab);
    },
    [onSelectNewTab]
  );

  return (
    <div className="h-full overflow-scroll bg-slate-100 dark:bg-slate-700">
      {menuOpen ? (
        <ul className="fixed z-40 flex flex-col h-auto rounded shadow-xl right-5 top-32 bg-slate-50">
          {Object.keys(tabContent).map((tab) => (
            <li className={`w-full`} key={tab}>
              <button
                onClick={() => handleTabSelect(tab)}
                className={` w-full text-sm border-transparent text-center p-4 hover:bg-gray-300 hover:text-gray-600 dark:hover:text-gray-300 ${
                  activeTab === tab
                    ? "-mb-px border-b border-gray-600 text-gray-600 dark:border-gray-300 dark:text-gray-300 bg-blue-100 dark:bg-slate-500"
                    : ""
                }`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="fixed z-10 w-full overflow-x-scroll shadow top-20">
        <div className="z-40 flex sm:w-[calc(100%-257px)] w-[calc(100%-48px)] flex-row  bg-slate-100 bg-opacity-60 text-center text-sm font-medium text-gray-500 backdrop-blur-md backdrop-filter transition-all dark:border-gray-700 dark:bg-slate-600 dark:text-gray-400 ">
          <ul className="flex flex-grow -mb-px transition-all ">
            <li className="p-4 mr-2 truncate hover:w-auto">{header}</li>
            <li className="flex-row hidden md:flex">
              <ul className="flex flex-row h-auto">
                {Object.keys(tabContent).map((tab) => (
                  <li className={`mr-2`} key={tab}>
                    <button
                      onClick={() => handleTabSelect(tab)}
                      className={`inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300 ${
                        activeTab === tab
                          ? "-mb-px border-b border-gray-600 text-gray-600 dark:border-gray-300 dark:text-gray-300"
                          : ""
                      }`}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
            {additionalItems?.map((item, i) => (
              <li className="mr-2 truncate" key={`addtional${i}`}>
                {item}
              </li>
            )) ?? null}
            <li className="flex flex-row justify-end flex-grow md:hidden">
              <div className="flex flex-col justify-center ">
                <button
                  className="flex flex-row justify-center"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <MdMenu size={22} />
                </button>
              </div>
            </li>
          </ul>
          <ul>
            <li className="flex flex-row justify-end">
              <div className="h-12 p-2 mr-2 overflow-hidden">{rightEnd}</div>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full h-auto mt-14 bg-slate-100 dark:bg-slate-700">
        {Object.keys(tabContent).map((tab) => (
          <div key={tab} className="w-full overflow-scroll">
            {activeTab === tab ? tabContent[tab] : null}
          </div>
        ))}
      </div>
    </div>
  );
}
