"use client";

import { useCallback, useRef, useState } from "react";
import Button from "./Button";
import { twMerge as twm } from "tailwind-merge";

interface ConfirmButtonProps {
  className?: string;
  confirmingClassName?: string;
  children: React.ReactNode | React.ReactNode[];
  onConfirmed: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  ariaLabelConfirming?: string;
}

export default function ConfirmButton({
  children,
  className,
  confirmingClassName,
  onConfirmed,
  disabled,
  ariaLabel,
  ariaLabelConfirming
}: ConfirmButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const [canClick, setCanClick] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const handleClick = () => {
    if (confirming) {
      if (!canClick) return;
      onConfirmed();
    } else {
      setConfirming(true);
      intervalRef.current = setTimeout(() => setCanClick(true), 500);
    }
  };

  const handleBlur = useCallback(() => {
    setConfirming(false);
    setCanClick(false);
    clearTimeout(intervalRef.current);
  }, []);

  const classNameResolved = confirming
    ? canClick
      ? confirmingClassName
      : twm(confirmingClassName, "bg-amber-400")
    : className;

  return (
    <Button
      disabled={disabled}
      className={classNameResolved}
      onClick={handleClick}
      onBlur={handleBlur}
      onMouseOut={handleBlur}
      aria-label={confirming ? ariaLabelConfirming ?? "Confirm this action" : ariaLabel ?? "Click to confirm this action"}
    >
      {children}
    </Button>
  );
}
