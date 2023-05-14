"use client";
import { NewButton } from "@/app/components/NewButton";
import Link from "next/link";

export function NewTrainingSetButton({
  user,
}: {
  user: { email?: string | null | undefined; name?: string | null | undefined };
}) {
  return (
    <Link href="/profile/training/new">
      <NewButton />
    </Link>
  );
}
