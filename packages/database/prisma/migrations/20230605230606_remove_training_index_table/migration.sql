/*
  Warnings:

  - You are about to drop the `TrainingIndex` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TrainingIndex" DROP CONSTRAINT "TrainingIndex_trainingSetId_fkey";

-- AlterTable
ALTER TABLE "TrainingSet" ADD COLUMN     "trainingIndexVersion" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "TrainingIndex";
