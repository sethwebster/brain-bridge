import { notFound } from "next/navigation";
import invariant from "tiny-invariant";
import { getServerSession } from "~/server/auth";
import { removeFooter } from "~/utils/prompts";
import TrainingSetPage from "../components/TrainingSetPage";
import promptTemplate from "../DEPRECATED_PromptTemplate";
import ServerData from "~/server/server-data";

export default async function TrainingPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  invariant(session.user, "User must exist");
  const set = await ServerData.fetchUserTrainingSet(id);

  if (!set) {
    notFound();
  }
  return (
    <div className="w-full h-full">
      <TrainingSetPage
        trainingSet={{ ...set, prompt: removeFooter(set.prompt) }}
        user={session.user}
        promptTemplate={promptTemplate}
        session={session}
      />
    </div>
  );
}
