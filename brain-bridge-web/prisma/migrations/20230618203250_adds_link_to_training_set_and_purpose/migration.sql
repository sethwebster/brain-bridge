/*
  Warnings:

  - Added the required column `purpose` to the `Usage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trainingSetId` to the `Usage` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UsagePurpose" AS ENUM ('EMBEDDING', 'GENERATE');

-- AlterTable
ALTER TABLE "Usage" ADD COLUMN     "purpose" "UsagePurpose" NOT NULL,
ADD COLUMN     "trainingSetId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Usage" ADD CONSTRAINT "Usage_trainingSetId_fkey" FOREIGN KEY ("trainingSetId") REFERENCES "TrainingSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
