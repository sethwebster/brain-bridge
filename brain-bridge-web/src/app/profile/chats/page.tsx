import PaddedContainer from "@/app/components/padded-container";
import Data from "@/utils/data";
import { getServerSession } from "next-auth";
import invariant from "tiny-invariant";
import { ChatListing } from "./ChatListing";

export default async function Page() {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  const chats = await Data.fetchChats(session.user!.email!);

  return (
    <PaddedContainer>
      {/* @ts-expect-error RSC */}
      <ChatListing conversations={chats} />
    </PaddedContainer>
  );
}
