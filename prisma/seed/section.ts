import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const sectionData = [
  {
    title: "Section One - UX 测试",
    titleInUrl: "section_one_ux",
  },
  {
    title: "Section Two - 渲染测试 - 仅文字",
    titleInUrl: "section_two_render_text",
  },
] as const;

export default async function addSectionByBook(bookId: string) {
  await prisma.section.createMany({
    data: [
      {
        title: sectionData[0].title,
        titleInUrl: sectionData[0].titleInUrl,
        seqIndex: 0,
        bookId,
      },
      {
        title: sectionData[1].title,
        titleInUrl: sectionData[1].titleInUrl,
        seqIndex: 1,
        bookId,
      },
    ],
  });
}
