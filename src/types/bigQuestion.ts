import { nanoid } from "@/lib/renderer/utils/nanoid";
import { z } from "zod";

// schemas
export const SmallQuestionSchema = z.object({
  // 使用 nullish 是因为 prisma 会对 nullable field 进行默认值填充
  body: z.string().nullish(),
  explanation: z.string().nullish(),
  options: z.array(z.string()),
  answer: z.number().int(),
});

export const BigQuestionSchema = z.object({
  body: z.string().nullish(),
  explanation: z.string().nullish(),
  smallQuestions: z.array(SmallQuestionSchema).min(1),
});

export type BigQuestionType = z.infer<typeof BigQuestionSchema>;
export type SmallQuestionType = z.infer<typeof SmallQuestionSchema>;

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
