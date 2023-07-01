import invariant from "tiny-invariant";
import { NewTrainingSetButton } from "./NewTrainingSetButton";
import Link from "next/link";
import { DeleteTrainingSet } from "./DeleteTrainingSet";
import { DismissableInfoBox } from "~/app/components/InfoBox";
import ServerData from "~/server/server-data";
import { Suspense } from "react";
import { getServerSession } from "~/server/auth";
import ContentBoxWithHeading from "../components/ContentBoxWithHeading";
import { MdShare } from "react-icons/md";

async function TrainingPage() {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  const sets = await ServerData.fetchUserTrainingSets();

  const owned = sets.filter((set) => set.userId === session.user.id);
  const shared = sets.filter((set) => set.userId !== session.user.id);

  return (
    <>
      <ContentBoxWithHeading
        heading={
          <>
            <h1 className="text-xl">Training Sets</h1>
            {/* @ts-expect-error RSC */}
            <NewTrainingSetButton user={session.user} />
          </>
        }
      >
        {sets.length === 0 && (
          <DismissableInfoBox
            type="info"
            title="Getting Started with Training Sets"
            body="Training sets are collections of questions and answers, a prompt, and any amount of textual material Brain Bridge uses to train your chat bot. You can create a new training set by clicking the button below."
            dismissable={true}
            dismissableId={"info-box-training-sets"}
          />
        )}
        {shared.length > 0 && (
          <h2 className="mt-2 text-slate-600">Your Sets</h2>
        )}

        <ul>
          {owned
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((set, index) => (
              <li
                key={set.id}
                className="flex justify-between p-2 border-b border-b-slate-300 dark:border-b-slate-500"
              >
                <Link
                  href={`/profile/training/${set.id}`}
                  className="flex flex-row text-blue-400"
                >
                  {set.userId !== session.user.id && (
                    <div
                      className="flex flex-col justify-center mr-2"
                      title="This training set is shared with you"
                    >
                      <div className="p-1">
                        <MdShare />
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col justify-center">
                    {set.name || `Set ${index + 1}`}
                  </div>
                </Link>
                <DeleteTrainingSet id={set.id} user={session.user} />
              </li>
            ))}
        </ul>
        {shared.length > 0 && (
          <h2 className="mt-4 text-slate-600">Shared With You</h2>
        )}
        <ul>
          {shared
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((set, index) => (
              <li
                key={set.id}
                className="flex justify-between p-2 border-b border-b-slate-300 dark:border-b-slate-500"
              >
                <Link
                  href={`/profile/training/${set.id}`}
                  className="flex flex-row text-blue-400"
                >
                  {set.userId !== session.user.id && (
                    <div
                      className="flex flex-col justify-center mr-2"
                      title="This training set is shared with you"
                    >
                      <div className="p-1">
                        <MdShare />
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col justify-center">
                    {set.name || `Set ${index + 1}`}
                  </div>
                </Link>
                <DeleteTrainingSet id={set.id} user={session.user} />
              </li>
            ))}
        </ul>
      </ContentBoxWithHeading>
    </>
  );
}

export default function TrainingPageWrapper() {
  return (
    <Suspense fallback={<></>}>
      {/* @ts-expect-error RSC */}
      <TrainingPage />
    </Suspense>
  );
}
