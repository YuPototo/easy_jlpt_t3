import { z } from "zod";
import { titleToUniqueTitle } from "../utils";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const sectionRouter = createTRPCRouter({
  byBookId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const bookId = input;
    return ctx.prisma.section.findMany({ where: { bookId } });
  }),
  content: publicProcedure
    .input(
      z.object({
        bookTitle: z.string(),
        sectionTitleInUrl: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { bookTitle, sectionTitleInUrl } = input;

      // get book
      const book = await ctx.prisma.book.findUnique({
        where: {
          uniqueTitle: bookTitle,
        },
      });

      if (!book) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Book Not Found",
        });
      }

      // get section
      const section = await ctx.prisma.section.findFirst({
        where: {
          bookId: book.id,
          titleInUrl: sectionTitleInUrl,
        },
        select: {
            id: true,
          title: true,
          bigQuestions: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!section) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Section Not Found",
        });
      }

      return {
        sectionId: section.id,
        sectionTitle: section.title,
        bigQuestions: section.bigQuestions.map((bq) => bq.id),
      };
    }),
  // todo: use admin procedure
  add: publicProcedure
    .input(
      z.object({
        bookId: z.string(),
        title: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { bookId, title } = input;

      const lastSection = await ctx.prisma.section.findFirst({
        where: {
          bookId,
        },
        orderBy: [
          {
            seqIndex: "desc",
          },
        ],
        take: 1,
      });

      const largestIndex = lastSection?.seqIndex ?? 0;

      return ctx.prisma.section.create({
        data: {
          bookId,
          title,
          titleInUrl: titleToUniqueTitle(title),
          seqIndex: largestIndex + 1,
        },
      });
    }),
});
