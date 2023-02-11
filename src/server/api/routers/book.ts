import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { titleToUniqueTitle } from "../utils";

export const bookRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.book.findMany();
  }),
  byUniqueTitle: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const uniqueTitle = input;
    return ctx.prisma.book.findUnique({ where: { uniqueTitle } });
  }),
  // todo: use admin procedure
  add: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const title = input.title;
      const uniqueTitle = titleToUniqueTitle(title);
      const book = await ctx.prisma.book.create({
        data: {
          title,
          uniqueTitle,
        },
      });
      return book;
    }),
});
