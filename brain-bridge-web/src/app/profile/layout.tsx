import { getServerSession } from "next-auth";
import PaddedContainer from "../components/padded-container";
import { SideBar } from "./chat/components/SideBar";
import Data from "@/utils/data";
import invariant from "tiny-invariant";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  invariant(session.user, "User must exist");
  const sets = await Data.fetchTrainingSets({ email: session.user.email! })
  const chats = await Data.fetchChats({ email: session.user.email! })
  return (
    <div className="w-full h-full bg-slate-100 dark:bg-slate-700">
      <div className="h-full p-4 sm:ml-64">
        <SideBar setCount={sets.length} chatCount={chats.length} />
        <PaddedContainer>{children}</PaddedContainer>
      </div>
    </div>
  );
}
