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
  if (!set) { 
    Logger.error("Training set not found", id);
    notFound();
    return;
  }
  
  const firstConversation = set.conversations.find(c => c.userId === session.user.id)
  if (!firstConversation) {
    const conversation = await ServerData.newChat(set.id);
    set.conversations.push(conversation);
  } else {
    const conversation = await ServerData.fetchChat(
      firstConversation.id
    );
    set.conversations[0] = conversation;    
  }

  // console.log("set", set)

  return (
    <div className="w-full h-full">
      <TrainingSetPage
        session={session}
        activeTab={tab}
        trainingSet={{ ...set, prompt: removeFooter(set.prompt) }}
        user={session.user}
        promptTemplate={promptTemplate}
      />
    </div>
  );
}
