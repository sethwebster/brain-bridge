"use client";

import { TrashCan } from "~/app/components/SvgIcons";
import ConfirmButton from "./ConfirmButton";

export default function DeleteButton({
  className,
  confirmingClassName = "bg-red-400",
  onConfirmed,
  disabled,
}: {
  className?: string;
  confirmingClassName?: string;
  onConfirmed: () => void;
  disabled?: boolean;
}) {
  return (
    <ConfirmButton
      disabled={disabled}
      className={className}
      confirmingClassName={confirmingClassName}
      onConfirmed={onConfirmed}
    >
      <TrashCan strokeColor="#eee" fillColor="#555" />
    </ConfirmButton>
  );
}
