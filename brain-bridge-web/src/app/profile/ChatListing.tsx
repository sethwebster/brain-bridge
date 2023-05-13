import { getServerSession } from "next-auth";
import invariant from "tiny-invariant";
import Link from "next/link";
import { NewChat } from "./NewChat";
import { DeleteChat } from "./DeleteChat";

export async function ChatListing({
  conversations,
}: {
  conversations: ConversationStub[];
}) {
  const session = await getServerSession();
  invariant(session, "Session must exist");
  invariant(session.user, "User must be logged in");
  return (
    <div>
      <h1 className="text-2xl">Chats</h1>
      <NewChat user={session.user} />
      <ul>
        {conversations.map((conversation, index) => (
          <li key={conversation.id}>
            <Link
              href={`/profile/chat/${conversation.id}`}
              className="text-blue-400"
            >
              {conversation.name || `Chat ${index + 1}`}
            </Link>{" "}
            <DeleteChat id={conversation.id} user={session.user as any} />
          </li>
        ))}
      </ul>
    </div>
  );
}
