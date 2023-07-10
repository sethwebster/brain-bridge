-- CreateEnum
CREATE TYPE "TrainingSetRoles" AS ENUM ('OWNER', 'EDITOR', 'VIEWER');

-- AlterTable
ALTER TABLE "TrainingSetShares" ADD COLUMN     "role" "TrainingSetRoles" NOT NULL DEFAULT 'VIEWER';
