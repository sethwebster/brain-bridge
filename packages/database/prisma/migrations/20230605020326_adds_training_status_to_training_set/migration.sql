-- CreateEnum
CREATE TYPE "TrainingSetTrainingStatus" AS ENUM ('IDLE', 'TRAINING', 'ERROR');

-- AlterTable
ALTER TABLE "TrainingSet" ADD COLUMN     "trainingStatus" "TrainingSetTrainingStatus" NOT NULL DEFAULT 'IDLE';
