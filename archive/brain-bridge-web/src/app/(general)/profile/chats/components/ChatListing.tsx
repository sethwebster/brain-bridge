import { getServerSession } from "next-auth";
import invariant from "tiny-invariant";
import Link from "next/link";
import { NewChatButton } from "./NewChatButton";
import { DeleteChat } from "./DeleteChatButton";

export async function ChatListing({
  conversations,
  trainingSets,
}: {
  conversations: ConversationStub[];
  trainingSets?: TrainingSet[];
}) {
  const session = await getServerSession();

  invariant(session, "Session must exist");
  invariant(session.user, "User must be logged in");

  return (
    <div className="w-full h-full p-4 border-2 border-gray-700  rounded-lg dark:bg-slate-700">
      <header className="flex justify-between pb-2 border-b border-gray-600 ">
        <h1 className="text-2xl">Chats</h1>
        <NewChatButton user={session.user} trainingSets={trainingSets} />
      </header>
      <ul>
        {conversations.map((conversation, index) => (
          <li key={conversation.id} className="flex justify-between p-2">
            <Link
              href={`/profile/chat/${conversation.id}`}
              className="text-blue-400"
            >
              {conversation.name || `Chat ${index + 1}`}
            </Link>
            <DeleteChat id={conversation.id} user={session.user as any} />
          </li>
        ))}
      </ul>
    </div>
  );
}
