import { PrismaClient } from "@prisma/client";
import { BigQuestionSchema } from "../../src/types/bigQuestion";
import { z } from "zod";

const BigQuestionInputSchema = BigQuestionSchema.merge(
  z.object({
    sectionId: z.string(),
    seqIndex: z.number(),
  })
);

// insert function

const prisma = new PrismaClient();

async function createBigQuestion(data: z.infer<typeof BigQuestionInputSchema>) {
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
