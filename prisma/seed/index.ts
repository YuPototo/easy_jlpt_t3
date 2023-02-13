import { PrismaClient } from "@prisma/client";
import { data as bookData } from "./data/book";
import { data as bigQuestionData } from "./data/questions";
import addSectionByBook, { sectionData } from "./section";
import createBigQuestion from "./bigQuestion";

const prisma = new PrismaClient();

async function main() {
  await addBooks();
  await addSections();
  await addQuestions();
}

async function addBooks() {
  await prisma.book.createMany({
    data: bookData,
  });
}

async function addSections() {
  const books = await prisma.book.findMany();
  for (const book of books) {
    await addSectionByBook(book.id);
  }
}

async function addQuestions() {
  // 对每个 book 的 section one: 添加简单题目
  const sectionOnes = await prisma.section.findMany({
    where: {
      titleInUrl: sectionData[0].titleInUrl,
    },
  });
  const simpleBigQuestions = bigQuestionData.simple;
  for (const section of sectionOnes) {
    for (let index = 0; index < simpleBigQuestions.length; index++) {
      const bigQuestion = simpleBigQuestions[index];
      if (bigQuestion === undefined) continue;
      await createBigQuestion({
        ...bigQuestion,
        sectionId: section.id,
        seqIndex: index,
      });
    }
  }

  // 对每个 book 的 section two：添加 rich text 题目
  const sectionTwos = await prisma.section.findMany({
    where: {
      titleInUrl: sectionData[1].titleInUrl,
    },
  });
  const richTextBigQuestions = bigQuestionData.richText;
  for (const section of sectionTwos) {
    for (let index = 0; index < richTextBigQuestions.length; index++) {
      const bigQuestion = richTextBigQuestions[index];
      if (bigQuestion === undefined) continue;
      await createBigQuestion({
        ...bigQuestion,
        sectionId: section.id,
        seqIndex: index,
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
