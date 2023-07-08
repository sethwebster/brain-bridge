import { getServerSession } from "next-auth";
import invariant from "tiny-invariant";
import { ChatListing } from "./components/ChatListing";
import ServerData from "~/server/server-data";

export default async function Page() {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  invariant(session.user, "User must exist");
  const trainingSets = await ServerData.fetchUserTrainingSets();
  const chats = await ServerData.fetchChats();

  return <ChatListing conversations={chats} trainingSets={trainingSets} />;
}
