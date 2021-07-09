/*
  Warnings:

  - Added the required column `surveyId` to the `SurveyItemAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SurveyItemAnswer" ADD COLUMN     "surveyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SurveyItemAnswer" ADD FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE CASCADE ON UPDATE CASCADE;
