/*
  Warnings:

  - You are about to drop the column `openApiKey` on the `UserSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSettings" DROP COLUMN "openApiKey",
ADD COLUMN     "openAIApiKey" TEXT;
