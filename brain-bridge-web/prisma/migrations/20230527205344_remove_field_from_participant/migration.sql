/*
  Warnings:

  - You are about to drop the column `publicChatId` on the `Participant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_publicChatId_fkey";

-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "publicChatId";
