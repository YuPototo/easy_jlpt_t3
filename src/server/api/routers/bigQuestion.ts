import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { BigQuestionSchema } from "../../../types/bigQuestion";
import { createTRPCRouter, publicProcedure } from "../trpc";

const AddBigQuestionSchema = z
  .object({
    sectionId: z.string(),
  })
  .merge(BigQuestionSchema);

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
  add: publicProcedure
    .input(AddBigQuestionSchema)
    .mutation(async ({ ctx, input }) => {
      // 获取 section 里有多少题了

      const count = await ctx.prisma.bigQuestion.count({
        where: { sectionId: input.sectionId },
      });

      const seqIndex = count + 1;

      // 添加 big question
      const bigQuestion = await ctx.prisma.bigQuestion.create({
        data: {
          body: input.body,
          explanation: input.explanation,
          sectionId: input.sectionId,
          seqIndex,
        },
      });

      // 添加 small question
      await ctx.prisma.smallQuestion.createMany({
        data: input.smallQuestions.map((smallQuestion, seqIndex) => ({
          body: smallQuestion.body,
          explanation: smallQuestion.explanation,
          options: smallQuestion.options,
          answer: smallQuestion.answer,
          bigQuestionId: bigQuestion.id,
          seqIndex: seqIndex,
        })),
      });

      return { success: true };
    }),
});
