"use client";
import Link from "next/link";
import {
  MdChat,
  MdChatBubbleOutline,
  MdDashboard,
  MdSummarize,
  MdTableChart,
} from "react-icons/md";

function SideBarItemLabel({
  children,
  title,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <span className="flex-1 ml-3 opacity-0 whitespace-nowrap sm:opacity-90" title={title}>
      {children}
    </span>
  );
}

export default function SideBar({
  setCount,
  chatCount,
  publicChatCount,
  currentCosts,
}: {
  setCount: number;
  chatCount: number;
  publicChatCount: number;
  currentCosts: number;
}) {
  return (
    <div className="w-12 h-full overflow-hidden transition-all shadow-lg sm:w-64">
      {/* SIDEBAR */}
      <aside
        id="default-sidebar"
        className="sticky w-64 h-full top-20 bg-gray-50 dark:bg-gray-800"
        aria-label="Sidebar"
      >
        <div className="h-full px-2 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/profile"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <MdDashboard />
                <SideBarItemLabel title="Home">Home</SideBarItemLabel>
              </Link>
            </li>
            <li>
              <Link
                href="/profile/chats"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <MdChat />
                <SideBarItemLabel title="Private Chats">Chats</SideBarItemLabel>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {chatCount}
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/profile/training"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <MdTableChart />
                <SideBarItemLabel title="Training Sets">
                  Training Sets
                </SideBarItemLabel>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {setCount}
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/profile/public-chats"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <MdChatBubbleOutline />
                <SideBarItemLabel title="Public Chats">
                  Public Chats
                </SideBarItemLabel>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {publicChatCount}
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/profile/billing"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <MdSummarize />
                <SideBarItemLabel title="Billing">Billing</SideBarItemLabel>
                <span className="inline-flex items-center justify-center w-auto h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  ${currentCosts.toFixed(2)}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
