-- CreateEnum
CREATE TYPE "TrainingSourceType" AS ENUM ('FILE', 'URL');

-- CreateTable
CREATE TABLE "TrainingSource" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "TrainingSourceType" NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "trainingSetId" TEXT NOT NULL,

    CONSTRAINT "TrainingSource_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TrainingSource" ADD CONSTRAINT "TrainingSource_trainingSetId_fkey" FOREIGN KEY ("trainingSetId") REFERENCES "TrainingSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
