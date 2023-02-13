import type { BigQuestionType } from "../../../../src/types/bigQuestion";
import { makeParagraph } from "./utils";

// simple big questions for testing UX

/**
 * - no big question body and explanation
 * - 1 small question
 */
const questionOne: BigQuestionType = {
  smallQuestions: [
    {
      body: makeParagraph("What is the capital of France?"),
      explanation: makeParagraph("Paris is the capital of France."),
      options: [
        makeParagraph("Paris"),
        makeParagraph("London"),
        makeParagraph("Beijing"),
        makeParagraph("Tokyo"),
      ],
      answer: 0,
    },
  ],
};

/**
 * Big Question 2:
 * - big question body
 * - big question explanation
 * - 1 small questions
 */
const questionTwo: BigQuestionType = {
  body: makeParagraph("This is big question body"),
  explanation: makeParagraph("This is big question explanation"),
  smallQuestions: [
    {
      body: makeParagraph("What is the capital of Japan?"),
      explanation: makeParagraph("Tokyo is the capital of Japan."),
      options: [
        makeParagraph("Paris"),
        makeParagraph("London"),
        makeParagraph("Beijing"),
        makeParagraph("Tokyo"),
      ],
      answer: 3,
    },
  ],
};

/**
 * Big Question 3:
 * - big question body
 * - big question explanation
 * - 1 small questions
 */
const questionThree: BigQuestionType = {
  body: makeParagraph("This is big question body"),
  explanation: makeParagraph("This is big question explanation"),
  smallQuestions: [
    {
      body: makeParagraph("What is the capital of France?"),
      explanation: makeParagraph("Paris is the capital of France."),
      options: [
        makeParagraph("Paris"),
        makeParagraph("London"),
        makeParagraph("Beijing"),
        makeParagraph("Tokyo"),
      ],
      answer: 0,
    },
    {
      body: makeParagraph("What is the capital of Germany?"),
      explanation: makeParagraph("Berlin is the capital of Germany."),
      options: [
        makeParagraph("Paris"),
        makeParagraph("London"),
        makeParagraph("Beijing"),
        makeParagraph("Berlin"),
      ],
      answer: 3,
    },
  ],
};

const data = [questionOne, questionTwo, questionThree];

export default data;
