/*
  Warnings:

  - A unique constraint covering the columns `[question]` on the table `MissedQuestions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
DELETE from "MissedQuestions";
CREATE UNIQUE INDEX "MissedQuestions_question_key" ON "MissedQuestions"("question");
