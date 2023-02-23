import { nanoid } from "@/lib/renderer/utils/nanoid";
import type { BigQuestionType } from "@/types/bigQuestion";
import { BigQuestionSchema, SmallQuestionSchema } from "@/types/bigQuestion";
import { z } from "zod";

// 用于创建题目时的 small question schema
const SmallQuestionInputSchema = SmallQuestionSchema.omit({
  options: true,
}).merge(
  z.object({
    uuid: z.string(),
    options: z.array(
      z.object({
        uuid: z.string(),
        content: z.string(),
      })
    ),
  })
);

const BigQuestionInputSchema = BigQuestionSchema.omit({
  smallQuestions: true,
}).merge(
  z.object({
    smallQuestions: z.array(SmallQuestionInputSchema),
  })
);

export type SmallQuestionInputType = z.infer<typeof SmallQuestionInputSchema>;
export type BigQuestionInputType = z.infer<typeof BigQuestionInputSchema>;

export function bigQuestionInputToBigQuestion(
  input: BigQuestionInputType
): BigQuestionType {
  return {
    body: input.body,
    explanation: input.explanation,
    smallQuestions: input.smallQuestions.map((smallQuestion) => ({
      body: smallQuestion.body,
      explanation: smallQuestion.explanation,
      options: smallQuestion.options.map((option) => option.content),
      answer: smallQuestion.answer,
    })),
  };
}

export function bigQuestionToBigQuestionInput(
  bigQuestion: BigQuestionType
): BigQuestionInputType {
  return {
    body: bigQuestion.body,
    explanation: bigQuestion.explanation,
    smallQuestions: bigQuestion.smallQuestions.map((smallQuestion) => ({
      uuid: nanoid(),
      body: smallQuestion.body,
      explanation: smallQuestion.explanation,
      options: smallQuestion.options.map((option) => ({
        uuid: nanoid(),
        content: option,
      })),
      answer: smallQuestion.answer,
    })),
  };
}
