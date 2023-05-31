import { getServerSession } from "next-auth";
import invariant from "tiny-invariant";
import PublicChatsList from "./components/PublicChatsList";
import ServerData from "~/server/server-data";

export default async function PublicChatsPage() {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  const chats = await ServerData.fetchPublicChats();
  const sets = await ServerData.fetchUserTrainingSets();
  return (
    <PublicChatsList
      session={session}
      publicChats={chats}
      trainingSets={sets}
    />
  );
}
