import { getServerSession } from "next-auth";
import invariant from "tiny-invariant";
import NewTrainingSetForm from "../new/components/TrainingSetForm";
import Data from "@/utils/data";
import promptTemplate, { promptFooter } from "../new/PromptTemplate";
import { removeFooter } from "@/utils/prompts";
import PaddedContainer from "@/app/(general)/components/PaddedContainer";

export default async function TrainingPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  invariant(session.user, "User must exist");
  const set = await Data.fetchTrainingSet(
    id,
    session.user as { email: string }
  );
  return (
    <PaddedContainer>
      <div className="w-full h-auto p-4 border-2 border-gray-700  rounded-lg">
        <header className="flex justify-between pb-2 border-b border-gray-600 ">
          <h1 className="text-2xl">Set:{set.name}</h1>
        </header>
        <NewTrainingSetForm
          trainingSet={{ ...set, prompt: removeFooter(set.prompt) }}
          user={session.user}
          promptTemplate={promptTemplate}
          promptFooter={promptFooter}
        />
      </div>
    </PaddedContainer>
  );
}
