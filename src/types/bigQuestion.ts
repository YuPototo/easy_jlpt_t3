import { z } from "zod";

// schemas
const SmallQuestionSchema = z.object({
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
