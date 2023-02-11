import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const sectionRouter = createTRPCRouter({
  byBookId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const bookId = input;
    return ctx.prisma.section.findMany({ where: { bookId } });
  }),
  add: publicProcedure
    .input(
      z.object({
        bookId: z.string(),
        title: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { bookId, title } = input;
      return ctx.prisma.section.create({
        data: {
          bookId,
          title,
        },
      });
    }),
});
