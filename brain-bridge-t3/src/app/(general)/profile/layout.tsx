import invariant from "tiny-invariant";
import { getServerSession } from "~/server/auth";
import ServerData from "~/server/server-data";
import Toast from "~/app/components/Toast";
import NoAnonymous from "./components/NoAnonymous";
import SideBarLayout from "./components/SideBarLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  const setsRequest = ServerData.fetchUserTrainingSets();
  const chatsRequest = ServerData.fetchChats();
  const publicChatsRequest = ServerData.fetchPublicChats();
  const costsRequest = ServerData.fetchCurrentCosts();
  const [sets, chats, publicChats, costs] = await Promise.all([
    setsRequest,
    chatsRequest,
    publicChatsRequest,
    costsRequest,
  ]);
  const totalCurrentCosts = Object.keys(costs).reduce((acc, key) => {
    const toAdd = costs[key]?.cost ?? 0;
    return acc + toAdd;
  }, 0);
  // invariant(session, "Session must exist");
  // invariant(session.user, "User must exist");
  // const sets = await Data.fetchTrainingSets({ email: session.user.email! });
  // const chats = await Data.fetchChats({ email: session.user.email! });
  // const { data: publicChats } = await Data.fetchUserPublicChats({
  //   email: session.user.email!,
  // });
  return (
    <NoAnonymous session={session}>
      <SideBarLayout
        setsCount={sets.length}
        chatCount={chats.length}
        publicChatCount={publicChats.length}
        currentCosts={totalCurrentCosts}
      >{children}</SideBarLayout>
      <Toast />
    </NoAnonymous>
  );
}
