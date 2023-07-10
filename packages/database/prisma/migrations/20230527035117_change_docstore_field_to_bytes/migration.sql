/*
  Warnings:

  - Changed the type of `docStore` on the `TrainingIndex` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TrainingIndex" DROP COLUMN "docStore",
ADD COLUMN     "docStore" BYTEA NOT NULL;
