import PublicChatsList from "../../../public-chats/components/PublicChatsList";
import { type Session } from "next-auth";
import {
  type PublicChatWithRelations,
  type TrainingSetWithRelations,
} from "~/data/interfaces/types";

interface PublicChatsTabProps {
  canEdit: boolean;
  publicChats: PublicChatWithRelations[];
  session: Session;
  trainingSet: TrainingSetWithRelations;
}

export default function PublicChatsTab({
  canEdit,
  publicChats,
  session,
  trainingSet,
}: PublicChatsTabProps) {
  return (
    <PublicChatsList
      publicChats={publicChats}
      session={session}
      trainingSet={trainingSet}
    />
  );
}
