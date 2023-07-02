import React from "react";
import Popover from "./Popover";

function DashboardCard({
  amount,
  icon,
  title,
  className,
  popover,
}: {
  amount: number;
  icon: React.ReactNode;
  title: string;
  className?: string;
  popover?: { title: string; content: string | React.ReactNode };
}) {
  const resolvedClassName = className?.includes("bg-")
    ? className
    : (className ?? "") + " bg-white dark:bg-gray-800";
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const [popoverVisible, setPopoverVisible] = React.useState(false);
  const handleMouseEnter = () => {
    console.log("handleMouseEnter");
    timeoutRef.current = setTimeout(() => {
      setPopoverVisible(true);
    }, 200);
  };
  const handleMouseLeave = () => {
    console.log("handleMouseLeave");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setPopoverVisible(false);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-2 rounded-lg  p-4 shadow  ${
        resolvedClassName ?? ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="text-3xl text-gray-700 dark:text-gray-200">{amount}</div>
      <div className="flex flex-row items-center justify-center space-x-2 text-gray-500 dark:text-gray-200">
        {icon}
        <div className="text-sm">{title}</div>
      </div>
      {popover && (
        <Popover
          title={popover.title}
          content={popover.content}
          visible={popoverVisible}
        />
      )}
    </div>
  );
}

export default React.memo(DashboardCard);
