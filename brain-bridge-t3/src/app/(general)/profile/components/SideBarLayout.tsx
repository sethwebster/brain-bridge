"use client";
import { type PropsWithChildren } from "react";
import SideBar from "./SideBar";

export default function SideBarLayout({
  children,
  setsCount,
  publicChatCount,
  currentCosts,
}: PropsWithChildren & {
  setsCount: number;
  publicChatCount: number;
  currentCosts: number;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed flex flex-row w-full h-full max-h-screen">
      <div className="w-auto max-h-screen">
        <SideBar
          aria-label="Side Bar Navigation"
          setCount={setsCount}
          publicChatCount={publicChatCount}
          currentCosts={currentCosts}
        />
      </div>
      <div className="w-full h-auto overflow-hidden">{children}</div>
    </div>
  );
}
