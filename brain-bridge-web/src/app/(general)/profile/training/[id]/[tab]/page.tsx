import { notFound } from "next/navigation";
import invariant from "tiny-invariant";
import { getServerSession } from "~/server/auth";
import { removeFooter } from "~/utils/prompts";
import ServerData from "~/server/server-data";
import TrainingSetPage from "../../components/TrainingSetPage";
import { type TabsList } from "../../components/TrainingSetForm";
import Logger from "~/lib/logger";
import { type Metadata } from "next";

type Props = {
  params: { id: string; tab: TabsList };
  searchParams: { [key: string]: string | string[] | undefined };
};

const metadata = {
  title: "Brain Bridge - Training Sets - Training Set",
  description: "These are your training sets",
};

export async function generateMetadata({
  params: { id, tab },
}: Props): Promise<Metadata> {
  const set = await ServerData.fetchUserTrainingSet(id);
  return {
    ...metadata,
    title:
      process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
        ? metadata.title
        : `[${
            process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV ?? ""
          }] Brain Bridge - Training Set ${tab}: ${set?.name ?? "Unnamed"}`,
  };
}

export default async function TrainingPage({ params: { id, tab } }: Props) {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  invariant(session.user, "User must exist");
  const set = await ServerData.fetchUserTrainingSet(id);
  if (!set) {
    Logger.error("Training set not found", id);
    notFound();
    return;
  }

  const firstConversation = set.conversations.find(
    (c) => c.userId === session.user.id
  );
  if (!firstConversation) {
    const conversation = await ServerData.newChat(set.id);
    set.conversations.push(conversation);
  } else {
    const conversation = await ServerData.fetchChat(firstConversation.id);
    set.conversations[0] = conversation;
  }

  return (
    <div className="h-full w-full">
      <TrainingSetPage
        session={session}
        activeTab={tab}
        trainingSet={{ ...set, prompt: removeFooter(set.prompt) }}
        user={session.user}
        promptTemplate={""}
      />
    </div>
  );
}
