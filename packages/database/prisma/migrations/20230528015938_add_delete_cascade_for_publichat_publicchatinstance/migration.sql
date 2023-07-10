-- DropForeignKey
ALTER TABLE "PublicChatInstance" DROP CONSTRAINT "PublicChatInstance_publicChatId_fkey";

-- AddForeignKey
ALTER TABLE "PublicChatInstance" ADD CONSTRAINT "PublicChatInstance_publicChatId_fkey" FOREIGN KEY ("publicChatId") REFERENCES "PublicChat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
