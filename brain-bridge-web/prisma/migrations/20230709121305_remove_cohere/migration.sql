/*
  Warnings:

  - The values [COHERE_TOKEN] on the enum `UsageType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;

update public."Usage" set "type" = 'TOKEN' where "type" = 'COHERE_TOKEN';

CREATE TYPE "UsageType_new" AS ENUM ('TOKEN');
ALTER TABLE "Usage" ALTER COLUMN "type" TYPE "UsageType_new" USING ("type"::text::"UsageType_new");
ALTER TYPE "UsageType" RENAME TO "UsageType_old";
ALTER TYPE "UsageType_new" RENAME TO "UsageType";
DROP TYPE "UsageType_old";
COMMIT;
