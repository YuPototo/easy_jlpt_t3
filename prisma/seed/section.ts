import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

export default async function addSectionByBook(bookId: string) {
  await prisma.section.createMany({
    data: [
      {
        title: "First Section",
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
