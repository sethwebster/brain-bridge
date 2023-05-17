import PaddedContainer from "@/app/components/padded-container";
import Data from "@/utils/data";
import { getServerSession } from "next-auth";
import invariant from "tiny-invariant";
import { ChatListing } from "./components/ChatListing";

export default async function Page() {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  invariant(session.user, "User must exist");
  const trainingSets = await Data.fetchTrainingSets(
    session.user as { email: string }
  );
  const chats = await Data.fetchChats({ email: session.user!.email! });

  return (
    <PaddedContainer>
      {/* @ts-expect-error RSC */}
      <ChatListing conversations={chats} trainingSets={trainingSets} />
    </PaddedContainer>
  );
}
