import { PrismaClient } from "@prisma/client";
import { z } from "zod";

// schemas
const SmallQuestionSchema = z.object({
  body: z.string().optional(),
  explanation: z.string().optional(),
  options: z.array(z.string()),
  answer: z.number().int(),
});

const BigQuestionSchema = z.object({
  sectionId: z.string(),
  seqIndex: z.number(),
  body: z.string().optional(),
  explanation: z.string().optional(),
  smallQuestions: z.array(SmallQuestionSchema).min(1),
});

export type BigQuestionType = z.infer<typeof BigQuestionSchema>;

// insert function

const prisma = new PrismaClient();

async function createBigQuestion(data: BigQuestionType) {
  const { sectionId, seqIndex, body, explanation, smallQuestions } = data;
  const bigQuestion = await prisma.bigQuestion.create({
    data: {
      sectionId,
      seqIndex,
      body,
      explanation,
    },
  });

  const smallQuestionPromises = smallQuestions.map((smallQuestion, index) =>
    prisma.smallQuestion.create({
      data: {
        body: smallQuestion.body,
        explanation: smallQuestion.explanation,
        options: smallQuestion.options,
        answer: smallQuestion.answer,
        bigQuestionId: bigQuestion.id,
        seqIndex: index,
      },
    })
  );

  await Promise.all(smallQuestionPromises);
}

export default createBigQuestion;
