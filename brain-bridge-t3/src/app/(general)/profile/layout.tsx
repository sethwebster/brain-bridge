import invariant from "tiny-invariant";
import { getServerSession } from "~/server/auth";
import SideBar from "./components/SideBar";
import SideBarPaddedContainer from "./components/SidebarPaddedContainer";
import ServerData from "~/server/server-data";
import Toast from "~/app/components/Toast";
import SidebarContainer from "./components/SidebarContainer";

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

  const [sets, chats, publicChats] = await Promise.all([
    setsRequest,
    chatsRequest,
    publicChatsRequest,
  ]);
  // invariant(session, "Session must exist");
  // invariant(session.user, "User must exist");
  // const sets = await Data.fetchTrainingSets({ email: session.user.email! });
  // const chats = await Data.fetchChats({ email: session.user.email! });
  // const { data: publicChats } = await Data.fetchUserPublicChats({
  //   email: session.user.email!,
  // });
  return (
    <div className="w-full h-full">
      <SidebarContainer
        setsCount={sets.length}
        chatCount={chats.length}
        publicChatCount={publicChats.length}
      >
        {children}
      </SidebarContainer>
    </div>
  );
}
