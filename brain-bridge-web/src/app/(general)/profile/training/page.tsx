import Data from "@/utils/data";
import { getServerSession } from "next-auth";
import invariant from "tiny-invariant";
import { NewTrainingSetButton } from "./NewTrainingSetButton";
import Link from "next/link";
import { DeleteTrainingSet } from "./DeleteTrainingSet";
import InfoBox from "@/app/components/InfoBox";

export default async function TrainingPage() {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  const sets = await Data.fetchTrainingSets({ email: session.user!.email! });
  return (
    <div className="w-full h-full p-4 border-2 border-gray-700 border-dashed rounded-lg">
      {sets.length === 0 && (
        <InfoBox
          title="Getting Started with Training Sets"
          body="Training sets are collections of questions and answers, a prompt, and any amount of textual material Brain Bridge uses to train your chat bot. You can create a new training set by clicking the button below."
          dismissable={true}
          dismissableId={"info-box-training-sets"}
        />
      )}
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
  );
}
