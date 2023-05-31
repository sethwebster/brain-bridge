/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `PublicChatInstance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PublicChatInstance_name_key" ON "PublicChatInstance"("name");
