/*
  Warnings:

  - The primary key for the `Choice` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Choice" DROP CONSTRAINT "Choice_pkey",
ADD PRIMARY KEY ("surveyId", "itemId", "choice");
