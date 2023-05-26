"use client";
import Link from "next/link";
import { NewButton } from "~/app/components/NewButton";

export function NewTrainingSetButton() {
  return (
    <Link href="/profile/training/new">
      <NewButton />
    </Link>
  );
}
