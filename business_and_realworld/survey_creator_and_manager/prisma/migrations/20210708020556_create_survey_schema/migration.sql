-- CreateTable
CREATE TABLE "SurveyRadioItem" (
    "surveyId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "choice" TEXT NOT NULL,

    PRIMARY KEY ("surveyId","itemId","choice")
);

-- CreateTable
CREATE TABLE "SurveyCheckboxkItem" (
    "surveyId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "choice" TEXT NOT NULL,

    PRIMARY KEY ("surveyId","itemId","choice")
);

-- CreateTable
CREATE TABLE "SurveyTextInputItem" (
    "surveyId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    PRIMARY KEY ("surveyId","itemId")
);

-- CreateTable
CREATE TABLE "SurveyItem" (
    "id" TEXT NOT NULL,
    "surveyId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "description" TEXT,

    PRIMARY KEY ("id","surveyId")
);

-- CreateTable
CREATE TABLE "Survey" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SurveyRadioItem_surveyId_itemId_unique" ON "SurveyRadioItem"("surveyId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "SurveyCheckboxkItem_surveyId_itemId_unique" ON "SurveyCheckboxkItem"("surveyId", "itemId");

-- AddForeignKey
ALTER TABLE "SurveyRadioItem" ADD FOREIGN KEY ("surveyId", "itemId") REFERENCES "SurveyItem"("id", "surveyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyCheckboxkItem" ADD FOREIGN KEY ("surveyId", "itemId") REFERENCES "SurveyItem"("id", "surveyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyTextInputItem" ADD FOREIGN KEY ("surveyId", "itemId") REFERENCES "SurveyItem"("id", "surveyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyItem" ADD FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE CASCADE ON UPDATE CASCADE;
