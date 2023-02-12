import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const bigQuestionRouter = createTRPCRouter({
  byId: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const id = input;
    const data = await ctx.prisma.bigQuestion.findUnique({
      where: { id },
      select: {
        body: true,
        explanation: true,
        smallQuestions: {
          select: {
            body: true,
            explanation: true,
            options: true,
            answer: true,
          },
        },
      },
    });

    if (!data) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Big Question Not Found",
      });
    }

    return data;
  }),
});
