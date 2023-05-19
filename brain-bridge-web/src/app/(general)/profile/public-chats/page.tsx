import Data from "@/utils/data";
import { getServerSession } from "next-auth";
import invariant from "tiny-invariant";
import { NewTrainingSetButton } from "../training/NewTrainingSetButton";
import PaddedContainer from "../../components/padded-container";
import Link from "next/link";
import { DeleteTrainingSet } from "../training/DeleteTrainingSet";
import { PencilIcon } from "../training/new/components/svg-icons";
import PublicChatItem from "./components/public-chat-item";
import PublicChatsList from "./components/public-chats-list";

export default async function PublicChatsPage() {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  invariant(session.user, "User must exist");
  const { data } = await Data.fetchUserPublicChats(
    session.user as { email: string }
  );

  const sets = await Data.fetchTrainingSets({ email: session.user!.email! });

  return (
    <PublicChatsList
      session={session}
      publicChats={data || []}
      trainingSets={sets}
    />
  );
}
