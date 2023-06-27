import { notFound } from "next/navigation";
import invariant from "tiny-invariant";
import { getServerSession } from "~/server/auth";
import { removeFooter } from "~/utils/prompts";
import ServerData from "~/server/server-data";
import TrainingSetPage from "../../components/TrainingSetPage";
import promptTemplate from "../../DEPRECATED_PromptTemplate";
import { type TabsList } from "../../components/TrainingSetForm";

export default async function TrainingPage({
  params: { id, tab },
}: {
  params: { id: string; tab: string };
}) {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  invariant(session.user, "User must exist");
  const set = await ServerData.fetchUserTrainingSet(id);

  if (!set) {
    notFound();
  }

  const activeTabTitleCase = (tab.charAt(0).toUpperCase() +
    tab.toLowerCase().slice(1)) as TabsList;
  return (
    <div className="w-full h-full">
      <TrainingSetPage
        session={session}
        activeTab={activeTabTitleCase}
        trainingSet={{ ...set, prompt: removeFooter(set.prompt) }}
        user={session.user}
        promptTemplate={promptTemplate}
      />
    </div>
  );
}
