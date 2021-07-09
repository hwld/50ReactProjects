/*
  Warnings:

  - The primary key for the `Choice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `surveyId` on the `Choice` table. All the data in the column will be lost.
  - The primary key for the `SurveyItem` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Choice" DROP CONSTRAINT "Choice_surveyId_itemId_fkey";

-- AlterTable
ALTER TABLE "Choice" DROP CONSTRAINT "Choice_pkey",
DROP COLUMN "surveyId",
ADD PRIMARY KEY ("itemId", "choice");

-- AlterTable
ALTER TABLE "SurveyItem" DROP CONSTRAINT "SurveyItem_pkey",
ADD PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "SurveyItemAnswer" (
    "itemId" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("itemId","value")
);

-- AddForeignKey
ALTER TABLE "Choice" ADD FOREIGN KEY ("itemId") REFERENCES "SurveyItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyItemAnswer" ADD FOREIGN KEY ("itemId") REFERENCES "SurveyItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
