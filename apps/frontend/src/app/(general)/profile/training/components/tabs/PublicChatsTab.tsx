import { type Session } from "next-auth";
import {
  type PublicChatWithRelations,
  type TrainingSetWithRelations,
} from "@/data/interfaces/types";
import PublicChatsList from "../../../components/PublicChatsList";
import InfoBox from "@/app/components/InfoBox";

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
  if (!canEdit) {
    return <InfoBox type="warning" title="Public Chats">You do not have permission to edit this training set.</InfoBox>;
  }
  return (
    <PublicChatsList
      publicChats={publicChats}
      session={session}
      trainingSet={trainingSet}
    />
  );
}
