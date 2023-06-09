import { getServerSession } from "next-auth";
import { SideBar } from "./chat/components/SideBar";
import Data from "@/utils/data";
import invariant from "tiny-invariant";
import SideBarPaddedContainer from "./chat/components/SidebarPaddedContainer";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  invariant(session.user, "User must exist");
  const sets = await Data.fetchTrainingSets({ email: session.user.email! });
  const chats = await Data.fetchChats({ email: session.user.email! });
  const { data: publicChats } = await Data.fetchUserPublicChats({
    email: session.user.email!,
  });
  return (
    <div className="flex flex-row w-full h-full bg-slate-100 dark:bg-slate-700">
      <div className="h-full sm:p-4">
        <SideBar
          setCount={sets.length}
          chatCount={chats.length}
          publicChatCount={publicChats?.length || 0}
        />
      </div>
      <SideBarPaddedContainer>{children}</SideBarPaddedContainer>
    </div>
  );
}
