-- CreateTable
CREATE TABLE "MissedQuestions" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "llmAnswer" TEXT NOT NULL,
    "correctAnswer" TEXT,
    "trainingSetId" TEXT NOT NULL,

    CONSTRAINT "MissedQuestions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MissedQuestions" ADD CONSTRAINT "MissedQuestions_trainingSetId_fkey" FOREIGN KEY ("trainingSetId") REFERENCES "TrainingSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
