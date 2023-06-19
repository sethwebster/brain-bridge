import SideBar from "./SideBar";

export default function SidebarContainer({
  children,
  setsCount,
  chatCount,
  publicChatCount,
  currentCosts,
}: {
  setsCount: number;
  chatCount: number;
  publicChatCount: number;
  currentCosts: number;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-row bg-slate-100 dark:bg-slate-700">
      <div className="h-full">
        <SideBar
          setCount={setsCount}
          chatCount={chatCount}
          publicChatCount={publicChatCount}
          currentCosts={currentCosts}
        />
      </div>
      <div className="ml-0 h-full w-full pl-0 sm:ml-64 ">
        <div className="h-auto mb-10">{children}</div>
      </div>
    </div>
  );
}
