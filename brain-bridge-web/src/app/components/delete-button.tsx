"use client";

import { useCallback, useState } from "react";

export default function DeleteButton({
  children,
  className,
  confirmingClassName,
  onConfirmed,
}: {
  className?: string;
  confirmingClassName?: string;
  children: React.ReactNode | React.ReactNode[];
  onConfirmed: () => void;
}) {
  const [confirming, setConfirming] = useState(false);

  const handleClick = () => {
    if (confirming) {
      onConfirmed();
    } else {
      setConfirming(true);
    }
  };

  const handleBlur = useCallback(() => {
    setConfirming(false);
  }, []);

  return (
    <button
      className={confirming ? confirmingClassName : className}
      onClick={handleClick}
      onBlur={handleBlur}
    >
      {children}
    </button>
  );
}
