import { PrismaClient } from "@prisma/client";
import { titleToUniqueTitle } from "../../src/server/api/utils";

const prisma = new PrismaClient();

export default async function addSectionByBook(bookId: string) {
  await prisma.section.createMany({
    data: [
      {
        title: "Section One",
        titleInUrl: titleToUniqueTitle("Section One"),
        seqIndex: 0,
        bookId,
      },
      {
        title: "Section Two",
        titleInUrl: titleToUniqueTitle("Section Two"),
        seqIndex: 1,
        bookId,
      },
      {
        title: "Section Three",
        titleInUrl: titleToUniqueTitle("Section Three"),
        seqIndex: 2,
        bookId,
      },
    ],
  });
}
