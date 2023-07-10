import { getServerSession } from "next-auth";
import invariant from "tiny-invariant";
import Link from "next/link";
import { NewChatButton } from "./NewChatButton";
import { DeleteChat } from "./DeleteChatButton";
import { type TrainingSet } from "@prisma/client";
import { type ConversationWithRelations } from "@/data/interfaces/types";
import ContentBoxWithHeading from "../../components/ContentBoxWithHeading";

export async function ChatListing({
  conversations,
  trainingSets,
}: {
  conversations: ConversationWithRelations[];
  trainingSets: TrainingSet[];
}) {
  const session = await getServerSession();

  invariant(session, "Session must exist");
  invariant(session.user, "User must be logged in");

  return (
    <>
      <ContentBoxWithHeading
        heading={
          <>
            <h1 className="text-xl">Chats</h1>
            <NewChatButton user={session.user} trainingSets={trainingSets} />
          </>
        }
      >
        <ul>
          {conversations.map((conversation, index) => (
            <li key={conversation.id} className="flex justify-between p-2">
              <Link
                href={`/profile/chat/${conversation.id}`}
                className="text-blue-400"
              >
                {conversation.name || `Chat ${index + 1}`}
              </Link>
              <div>{conversation.trainingSet.name}</div>
              <DeleteChat id={conversation.id} user={session.user} />
            </li>
          ))}
        </ul>
      </ContentBoxWithHeading>
    </>
  );
}
