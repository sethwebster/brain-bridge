import Data from "@/utils/data";
import { getServerSession } from "next-auth";
import invariant from "tiny-invariant";
import { NewTrainingSetButton } from "../training/NewTrainingSetButton";
import PaddedContainer from "../../components/padded-container";
import Link from "next/link";
import { DeleteTrainingSet } from "../training/DeleteTrainingSet";
import { PencilIcon } from "../training/new/components/svg-icons";
import PublicChatItem from "./components/public-chat-item";

export default async function PublicChatsPage() {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  invariant(session.user, "User must exist");
  const { data } = await Data.fetchUserPublicChats(
    session.user as { email: string }
  );

  const sets = await Data.fetchTrainingSets({ email: session.user!.email! });

  return (
    <PaddedContainer>
      <div className="w-full h-full p-4 border-2 border-gray-700 border-dashed rounded-lg">
        <header className="flex justify-between pb-2 border-b border-gray-600 border-dashed">
          <h1 className="text-2xl">Public Chats</h1>
          <NewTrainingSetButton user={session.user} />
        </header>
        <ul>
          {(data || []).map((chat, index) => (
            <li key={chat.id}>
              <PublicChatItem publicChat={chat} session={session} trainingSets={sets} />
            </li>
          ))}
        </ul>
      </div>
    </PaddedContainer>
  );
}
