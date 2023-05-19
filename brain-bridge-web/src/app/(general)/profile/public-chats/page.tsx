import Data from "@/utils/data";
import { getServerSession } from "next-auth";
import invariant from "tiny-invariant";
import PublicChatsList from "./components/PublicChatsList";

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
