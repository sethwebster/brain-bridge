-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "publicChatId" TEXT;

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "publicChatId" TEXT,
ALTER COLUMN "conversationId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "PublicChat" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "userId" TEXT NOT NULL,
    "trainingSetId" TEXT NOT NULL,

    CONSTRAINT "PublicChat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_publicChatId_fkey" FOREIGN KEY ("publicChatId") REFERENCES "PublicChat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_publicChatId_fkey" FOREIGN KEY ("publicChatId") REFERENCES "PublicChat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicChat" ADD CONSTRAINT "PublicChat_trainingSetId_fkey" FOREIGN KEY ("trainingSetId") REFERENCES "TrainingSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicChat" ADD CONSTRAINT "PublicChat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
