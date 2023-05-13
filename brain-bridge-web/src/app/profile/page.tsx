import Data from "@/utils/data";
import PaddedContainer from "../components/padded-container";
import { getServerSession } from "next-auth";
import invariant from "tiny-invariant";
import { ChatListing } from "./ChatListing";

export default async function Profile() {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  const chats = await Data.fetchChats(session.user!.email!);
  return (
    <PaddedContainer>
      {/* @ts-expect-error RSC*/}
      <ChatListing conversations={chats} />
    </PaddedContainer>
  );
}
