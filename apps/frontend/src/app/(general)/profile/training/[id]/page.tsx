import { redirect } from "next/navigation";

export default function TrainingPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return redirect(`/profile/training/${id}/details`);
}
