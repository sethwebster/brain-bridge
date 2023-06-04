import invariant from "tiny-invariant";
import { NewTrainingSetButton } from "./NewTrainingSetButton";
import Link from "next/link";
import { DeleteTrainingSet } from "./DeleteTrainingSet";
import InfoBox from "~/app/components/InfoBox";
import ServerData from "~/server/server-data";
import { Suspense } from "react";
import { ShareIcon } from "~/app/components/SvgIcons";
import { getServerSession } from "~/server/auth";
import ContentBoxWithHeading from "../components/ContentBoxWithHeading";

async function TrainingPage() {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  const sets = await ServerData.fetchUserTrainingSets();
  console.log("SETS", sets);
  return (
    <>
      <ContentBoxWithHeading
        heading={
          <>
            {sets.length === 0 && (
              <InfoBox
                title="Getting Started with Training Sets"
                body="Training sets are collections of questions and answers, a prompt, and any amount of textual material Brain Bridge uses to train your chat bot. You can create a new training set by clicking the button below."
                dismissable={true}
                dismissableId={"info-box-training-sets"}
              />
            )}
            <h1 className="text-xl">Training Sets</h1>
            {/* @ts-expect-error RSC */}
            <NewTrainingSetButton user={session.user} />
          </>
        }
      >
        <ul>
          {sets.map((set, index) => (
            <li key={set.id} className="flex justify-between p-2">
              <Link
                href={`/profile/training/${set.id}`}
                className="flex flex-row text-blue-400"
              >
                {set.userId !== session.user.id && (
                  <div
                    className="mr-2 flex flex-col justify-center"
                    title="This training set is shared with you"
                  >
                    <div className=" flex h-4 w-12  flex-row justify-center rounded-sm bg-amber-500 bg-opacity-80">
                      <ShareIcon
                        fillColor="white"
                        className="h-4 w-4 border-red-800"
                      />
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
