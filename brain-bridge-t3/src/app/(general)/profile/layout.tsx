import invariant from "tiny-invariant";
import { getServerSession } from "~/server/auth";
import SideBar from "./components/SideBar";
import SideBarPaddedContainer from "./components/SidebarPaddedContainer";
import { prisma } from "~/server/db";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  const setsRequest = prisma.trainingSet.findMany({
    where: { userId: session.user.id },
  });
  const chatsRequest = prisma.conversation.findMany({
    where: { userId: session.user.id },
  });

  const [sets, chats] = await Promise.all([setsRequest, chatsRequest]);
  // invariant(session, "Session must exist");
  // invariant(session.user, "User must exist");
  // const sets = await Data.fetchTrainingSets({ email: session.user.email! });
  // const chats = await Data.fetchChats({ email: session.user.email! });
  // const { data: publicChats } = await Data.fetchUserPublicChats({
  //   email: session.user.email!,
  // });
  return (
    <div className="flex flex-row w-full h-full bg-slate-100 dark:bg-slate-700">
      <div className="h-full sm:p-4">
        <SideBar setCount={sets.length} chatCount={chats.length} publicChatCount={0} />
      </div>
      <SideBarPaddedContainer>{children}</SideBarPaddedContainer>
    </div>
  );
}
