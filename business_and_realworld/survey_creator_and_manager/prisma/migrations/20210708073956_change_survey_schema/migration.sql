/*
  Warnings:

  - You are about to drop the `SurveyCheckboxkItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SurveyRadioItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SurveyTextInputItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `SurveyItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SurveyItemType" AS ENUM ('Radio', 'Checkbox', 'TextInput');

-- DropForeignKey
ALTER TABLE "SurveyCheckboxkItem" DROP CONSTRAINT "SurveyCheckboxkItem_surveyId_itemId_fkey";

-- DropForeignKey
ALTER TABLE "SurveyRadioItem" DROP CONSTRAINT "SurveyRadioItem_surveyId_itemId_fkey";

-- DropForeignKey
ALTER TABLE "SurveyTextInputItem" DROP CONSTRAINT "SurveyTextInputItem_surveyId_itemId_fkey";

-- AlterTable
ALTER TABLE "SurveyItem" ADD COLUMN     "type" "SurveyItemType" NOT NULL;

-- DropTable
DROP TABLE "SurveyCheckboxkItem";

-- DropTable
DROP TABLE "SurveyRadioItem";

-- DropTable
DROP TABLE "SurveyTextInputItem";

-- CreateTable
CREATE TABLE "Choice" (
    "surveyId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "choice" TEXT NOT NULL,

    PRIMARY KEY ("surveyId","itemId")
);

-- AddForeignKey
ALTER TABLE "Choice" ADD FOREIGN KEY ("surveyId", "itemId") REFERENCES "SurveyItem"("surveyId", "id") ON DELETE CASCADE ON UPDATE CASCADE;
