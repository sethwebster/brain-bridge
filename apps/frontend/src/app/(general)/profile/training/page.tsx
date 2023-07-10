import invariant from "tiny-invariant";
import { NewTrainingSetButton } from "./NewTrainingSetButton";
import DismissableInfoBox from "@/app/components/DismissableInfoBox";
import ServerData from "@/server/server-data";
import { Suspense } from "react";
import { getServerSession } from "@/server/auth";
import ContentBoxWithHeading from "../components/ContentBoxWithHeading";
import TrainingSetList from "./components/TrainingSetList";
import { Spinner } from "@/app/components/SvgIcons";
import { type Metadata } from "next";

const metadata = {
  title: "Brain Bridge - Training Sets",
  description: "These are your training sets",
};

export function generateMetadata(): Metadata {
  return {
    ...metadata,
    title:
      process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
        ? metadata.title
        : `[${
            process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV ?? ""
          }] ${metadata.title}`,
  };
}
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
            <NewTrainingSetButton />
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
        <TrainingSetList sets={owned} session={session} />
        {shared.length > 0 && (
          <h2 className="mt-4 text-slate-600">Shared With You</h2>
        )}
        <TrainingSetList sets={shared} session={session} />
      </ContentBoxWithHeading>
    </>
  );
}

export default function TrainingPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="animate-spin">
          <Spinner />
        </div>
      }
    >
      <TrainingPage />
    </Suspense>
  );
}
