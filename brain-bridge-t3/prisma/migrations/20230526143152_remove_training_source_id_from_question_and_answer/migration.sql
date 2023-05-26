/*
  Warnings:

  - You are about to drop the column `trainingSourceId` on the `QuestionAndAnswer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionAndAnswer" DROP CONSTRAINT "QuestionAndAnswer_trainingSetId_fkey";

-- AlterTable
ALTER TABLE "QuestionAndAnswer" DROP COLUMN "trainingSourceId";

-- AddForeignKey
ALTER TABLE "QuestionAndAnswer" ADD CONSTRAINT "QuestionAndAnswer_trainingSetId_fkey" FOREIGN KEY ("trainingSetId") REFERENCES "TrainingSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
