-- CreateTable
CREATE TABLE "BigQuestion" (
    "id" TEXT NOT NULL,
    "body" TEXT,
    "explanation" TEXT,
    "sectionId" TEXT NOT NULL,
    "seqIndex" INTEGER NOT NULL,

    CONSTRAINT "BigQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SmallQuestion" (
    "body" TEXT,
    "explanation" TEXT,
    "options" TEXT[],
    "answer" INTEGER NOT NULL,
    "seqIndex" INTEGER NOT NULL,
    "bigQuestionId" TEXT NOT NULL,

    CONSTRAINT "SmallQuestion_pkey" PRIMARY KEY ("bigQuestionId","seqIndex")
);

-- AddForeignKey
ALTER TABLE "BigQuestion" ADD CONSTRAINT "BigQuestion_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SmallQuestion" ADD CONSTRAINT "SmallQuestion_bigQuestionId_fkey" FOREIGN KEY ("bigQuestionId") REFERENCES "BigQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
