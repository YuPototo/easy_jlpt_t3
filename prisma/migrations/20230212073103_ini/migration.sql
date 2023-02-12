-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "uniqueTitle" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "seqIndex" INTEGER NOT NULL,
    "titleInUrl" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "Book_uniqueTitle_key" ON "Book"("uniqueTitle");

-- CreateIndex
CREATE UNIQUE INDEX "Section_bookId_titleInUrl_key" ON "Section"("bookId", "titleInUrl");

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BigQuestion" ADD CONSTRAINT "BigQuestion_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SmallQuestion" ADD CONSTRAINT "SmallQuestion_bigQuestionId_fkey" FOREIGN KEY ("bigQuestionId") REFERENCES "BigQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
