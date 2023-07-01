import React from "react";

function DashboardCard({
  amount,
  icon,
  title,
  className,
}: {
  amount: number;
  icon: React.ReactNode;
  title: string;
  className?: string;
}) {
  const resolvedClassName = className?.includes("bg-")
    ? className
    : (className ?? "") + " bg-white dark:bg-gray-800";
  return (
    <div
      className={`flex flex-col items-center justify-center space-y-2 rounded-lg  p-4 shadow  ${
        resolvedClassName ?? ""
      }`}
    >
      <div className="text-3xl text-gray-700 dark:text-gray-200">{amount}</div>
      <div className="flex flex-row items-center justify-center space-x-2 text-gray-500 dark:text-gray-200">
        {icon}
        <div className="text-sm">{title}</div>
      </div>
    </div>
  );
}

export default React.memo(DashboardCard);