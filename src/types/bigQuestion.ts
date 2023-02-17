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
