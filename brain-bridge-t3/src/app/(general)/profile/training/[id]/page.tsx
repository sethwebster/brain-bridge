import { notFound } from "next/navigation";
import invariant from "tiny-invariant";
import { getServerSession } from "~/server/auth";
import { removeFooter } from "~/utils/prompts";
import TrainingSetPage from "../components/TrainingSetForm";
import promptTemplate from "../PromptTemplate";
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
    <div className="h-auto w-full mt-20">
      <TrainingSetPage
        trainingSet={{ ...set, prompt: removeFooter(set.prompt) }}
        user={session.user}
        promptTemplate={promptTemplate}
      />
    </div>
  );
}
