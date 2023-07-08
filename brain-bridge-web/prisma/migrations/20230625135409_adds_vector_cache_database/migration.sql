-- CreateTable
CREATE TABLE "VectorCache" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "embedding" vector(1536),
    "hash" TEXT NOT NULL,

    CONSTRAINT "VectorCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VectorCache_hash_key" ON "VectorCache"("hash");
