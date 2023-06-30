import { notFound } from "next/navigation";
import invariant from "tiny-invariant";
import { getServerSession } from "~/server/auth";
import { removeFooter } from "~/utils/prompts";
import ServerData from "~/server/server-data";
import TrainingSetPage from "../../components/TrainingSetPage";
import promptTemplate from "../../DEPRECATED_PromptTemplate";
import { type TabsList } from "../../components/TrainingSetForm";
import Logger from "~/lib/logger";

export default async function TrainingPage({
  params: { id, tab },
}: {
  params: { id: string; tab: TabsList };
}) {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  invariant(session.user, "User must exist");
  const set = await ServerData.fetchUserTrainingSet(id);
  Logger.logWhen(!set, "error", "Training set not found", id)
  if (!set) {
    notFound();
  }

  const firstConversation = set.conversations[0];
  if (!firstConversation) {
    const conversation = await ServerData.newChat(set.id);
    set.conversations.push(conversation);
  } else {
    const conversation = await ServerData.fetchChat(
      firstConversation.id
    );
    set.conversations[0] = conversation;    
  }

  console.log("set", set)

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
