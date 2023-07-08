/*
  Warnings:

  - You are about to drop the column `invitationSetAt` on the `TrainingSetShares` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TrainingSetShares" DROP COLUMN "invitationSetAt",
ADD COLUMN     "invitationSentAt" TIMESTAMP(3);
