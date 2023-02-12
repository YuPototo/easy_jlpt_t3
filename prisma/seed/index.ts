import { PrismaClient } from "@prisma/client";
import { data as bookData } from "./data/book";
import { data as questionData } from "./data/question";
import addSectionByBook from "./section";
import createBigQuestion from "./question";

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

/**
 * 每个 section 里都有相同的题目
 */
async function addQuestions() {
  const sections = await prisma.section.findMany();
  for (const section of sections) {
    for (let index = 0; index < questionData.length; index++) {
      const question = questionData[index];
      if (question === undefined) continue;
      await createBigQuestion({
        ...question,
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
