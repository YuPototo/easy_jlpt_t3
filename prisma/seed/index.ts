import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await addBooks();
  await addSections();
}

async function addBooks() {
  await prisma.book.createMany({
    data: [
      {
        title: "N2 Words",
        uniqueTitle: "n2-words",
      },
      {
        title: "N1 Words",
        uniqueTitle: "n1-words",
      },
      {
        title: "N3 Words",
        uniqueTitle: "n3-words",
      },
      {
        title: "N2 Reading",
        uniqueTitle: "n2-reading",
      },
    ],
  });
}

async function addSections() {
  const books = await prisma.book.findMany();
  for (const book of books) {
    await addSectionByBook(book.id);
  }
}

async function addSectionByBook(bookId: string) {
  await prisma.section.createMany({
    data: [
      {
        title: faker.lorem.words(2),
        bookId,
      },
      {
        title: faker.lorem.words(2),
        bookId,
      },
      {
        title: faker.lorem.words(2),
        bookId,
      },
      {
        title: faker.lorem.words(2),
        bookId,
      },
    ],
  });
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
