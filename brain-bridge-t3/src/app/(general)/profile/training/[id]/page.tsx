import { notFound } from "next/navigation";
import invariant from "tiny-invariant";
import PaddedContainer from "~/app/components/PaddedContainer";
import { getServerSession } from "~/server/auth";
import { removeFooter } from "~/utils/prompts";
import TrainingSetPage from "../components/TrainingSetForm";
import promptTemplate from "../PromptTemplate";
import ServerData from "~/server/data";

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
    <PaddedContainer>
      <div className="w-full h-auto p-4 border-2 border-gray-700 rounded-lg">
        <header className="flex justify-between pb-2 border-b border-gray-600 ">
          <h1 className="text-2xl">Set:{set.name}</h1>
        </header>
        <TrainingSetPage
          trainingSet={{ ...set, prompt: removeFooter(set.prompt) }}
          user={session.user}
          promptTemplate={promptTemplate}
        />
      </div>
    </PaddedContainer>
  );
}
