-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "publicChatInstanceId" TEXT;

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "publicChatInstanceId" TEXT;

-- CreateTable
CREATE TABLE "PublicChatInstance" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "userId" TEXT NOT NULL,
    "publicChatId" TEXT NOT NULL,

    CONSTRAINT "PublicChatInstance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_publicChatInstanceId_fkey" FOREIGN KEY ("publicChatInstanceId") REFERENCES "PublicChatInstance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_publicChatInstanceId_fkey" FOREIGN KEY ("publicChatInstanceId") REFERENCES "PublicChatInstance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicChatInstance" ADD CONSTRAINT "PublicChatInstance_publicChatId_fkey" FOREIGN KEY ("publicChatId") REFERENCES "PublicChat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
