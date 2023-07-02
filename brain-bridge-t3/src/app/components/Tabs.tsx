"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, {
  type ReactNode,
  useState,
  useCallback,
  useLayoutEffect,
  useMemo,
  useEffect,
} from "react";
import { MdMenu } from "react-icons/md";
import Logger from "~/lib/logger";

interface TabsProps {
  header?: string | ReactNode;
  tabContent: Record<string, ReactNode>;
  initialSelectedTab?: string;
  rightEnd?: ReactNode;
  additionalItems?: (string | ReactNode)[];
  onSelectNewTab?: (tab: string) => void;
}

const makeUrlFriendly = (str: string) =>
  str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

const getBaseUrl = (location: string) => {
  const parts = location.split("/");
  let reversed = parts.reverse();
  reversed.shift();
  reversed = reversed.reverse();
  return reversed.join("/");
};

export default function Tabs({
  header,
  tabContent,
  initialSelectedTab,
  additionalItems,
  rightEnd,
}: TabsProps) {
  // Map user-friendly tab names to their url-friendly counterparts
  const tabsFriendly = useMemo(
    () =>
      Object.keys(tabContent).map((tab) => ({
        tab,
        friendly: makeUrlFriendly(tab),
      })),
    [tabContent]
  );

  // Get the selected tab from the url
  const resolvedInitialTab = initialSelectedTab
    ? tabsFriendly.find((t) => t.friendly === initialSelectedTab)
    : null;

  // If the url doesn't match a tab, use the first tab
  const selectedTab = resolvedInitialTab?.tab ?? Object.keys(tabContent)[0];

  /**
   * Mobile Dropdown open flag
   */
  const [menuOpen, setMenuOpen] = useState(false);
  const location = usePathname();
  const resolvedUrl = getBaseUrl(location);

  return (
    <div className="h-full overflow-scroll bg-slate-100 dark:bg-slate-700">
      {/* Mobile Dropdown */}

      {menuOpen ? (
        <ul className="fixed right-5 top-32 z-40 flex h-auto flex-col rounded bg-slate-50 shadow-xl">
          {Object.keys(tabContent).map((tab) => (
            <li className={`w-full`} key={tab}>
              <Link
                href={`${resolvedUrl}/${makeUrlFriendly(tab)}`}
                suppressHydrationWarning
                className={`block w-full border-transparent p-4 text-center text-sm hover:bg-gray-300 hover:text-gray-600 dark:hover:text-gray-300 ${
                  selectedTab === tab
                    ? "-mb-px border-b border-gray-600 bg-blue-100 text-gray-600 dark:border-gray-300 dark:bg-slate-500 dark:text-gray-300"
                    : ""
                }`}
              >
                {tab}
              </Link>
              {/* <button
                onClick={() => handleTabSelect(tab)}
                className={` w-full border-transparent p-4 text-center text-sm hover:bg-gray-300 hover:text-gray-600 dark:hover:text-gray-300 ${
                  activeTab === tab
                    ? "-mb-px border-b border-gray-600 bg-blue-100 text-gray-600 dark:border-gray-300 dark:bg-slate-500 dark:text-gray-300"
                    : ""
                }`}
              >
                {tab}
              </button> */}
            </li>
          ))}
        </ul>
      ) : null}

      {/* Desktop Tabs */}
      <div className="fixed top-20 z-10 w-full overflow-x-scroll shadow">
        <div className="z-40 flex w-[calc(100%-48px)] flex-row bg-slate-100  bg-opacity-60 text-center text-sm font-medium text-gray-500 backdrop-blur-md backdrop-filter transition-all dark:border-gray-700 dark:bg-slate-600 dark:text-gray-400 sm:w-[calc(100%-257px)] ">
          <ul className="-mb-px flex flex-grow transition-all ">
            <li className="mr-2 truncate p-4 hover:w-auto">{header}</li>
            <li className="hidden flex-row md:flex">
              <ul className="flex h-auto flex-row">
                {Object.keys(tabContent).map((tab) => (
                  <li className={`mr-2`} key={tab}>
                    <Link
                      href={`${resolvedUrl}/${makeUrlFriendly(tab)}`}
                      suppressHydrationWarning
                      className={`inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300 ${
                        selectedTab === tab
                          ? "-mb-px border-b border-gray-600 text-gray-600 dark:border-gray-300 dark:text-gray-300"
                          : ""
                      }`}
                    >
                      {tab}
                    </Link>
                    {/* <button
                      onClick={() => handleTabSelect(tab)}
                      className={`inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300 ${
                        activeTab === tab
                          ? "-mb-px border-b border-gray-600 text-gray-600 dark:border-gray-300 dark:text-gray-300"
                          : ""
                      }`}
                    >
                      {tab}
                    </button> */}
                  </li>
                ))}
              </ul>
            </li>
            {additionalItems?.map((item, i) => (
              <li className="mr-2 truncate" key={`addtional${i}`}>
                {item}
              </li>
            )) ?? null}
            <li className="flex flex-grow flex-row justify-end md:hidden">
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
              <div className="mr-2 h-12 overflow-hidden p-2">{rightEnd}</div>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-14 h-auto w-full bg-slate-100 dark:bg-slate-700">
        {Object.keys(tabContent).map((tab) => (
          <div key={tab} className="w-full overflow-scroll">
            {selectedTab === tab ? tabContent[tab] : null}
          </div>
        ))}
      </div>
    </div>
  );
}
