-- AlterTable
ALTER TABLE "TrainingSet" ADD COLUMN     "trainingIndexId" TEXT;

-- CreateTable
CREATE TABLE "TrainingIndex" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "trainingSetId" TEXT NOT NULL,
    "pending" BOOLEAN NOT NULL DEFAULT true,
    "metaData" JSONB NOT NULL,
    "vectors" BYTEA NOT NULL,
    "docStore" JSONB NOT NULL,

    CONSTRAINT "TrainingIndex_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrainingIndex_trainingSetId_key" ON "TrainingIndex"("trainingSetId");

-- AddForeignKey
ALTER TABLE "TrainingIndex" ADD CONSTRAINT "TrainingIndex_trainingSetId_fkey" FOREIGN KEY ("trainingSetId") REFERENCES "TrainingSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
