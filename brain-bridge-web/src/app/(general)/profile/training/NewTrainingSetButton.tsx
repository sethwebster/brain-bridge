"use client";
import Link from "next/link";
import { NewButton } from "../../components/NewButton";

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
