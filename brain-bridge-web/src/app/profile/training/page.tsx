import PaddedContainer from "@/app/components/padded-container";
import Data from "@/utils/data";
import { getServerSession } from "next-auth";
import invariant from "tiny-invariant";
import { NewTrainingSetButton } from "./NewTrainingSetButton";
import Link from "next/link";
import { DeleteTrainingSet } from "./DeleteTrainingSet";

export default async function TrainingPage() {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  const sets = await Data.fetchTrainingSets({ email: session.user!.email! });
  return (
    <PaddedContainer>
      <div className="w-full h-full p-4 border-2 border-gray-700 border-dashed rounded-lg">
        <header className="flex justify-between pb-2 border-b border-gray-600 border-dashed">
          <h1 className="text-2xl">Training Sets</h1>
          {/* @ts-expect-error RSC */}
          <NewTrainingSetButton user={session.user} />
        </header>
        <ul>
          {sets.map((set, index) => (
            <li key={set.id} className="flex justify-between p-2">
              <Link
                href={`/profile/training/${set.id}`}
                className="text-blue-400"
              >
                {set.name || `Set ${index + 1}`}
              </Link>
              <DeleteTrainingSet id={set.id} user={session.user as any} />
            </li>
          ))}
        </ul>
      </div>
    </PaddedContainer>
  );
}
