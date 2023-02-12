import type { BigQuestionType } from "../../../src/types/bigQuestion";

// data
export const data: Omit<BigQuestionType, "sectionId" | "seqIndex">[] = [
  // question 1: no big question body and explanation, 1 small question
  {
    smallQuestions: [
      {
        body: "What is the capital of France?",
        explanation: "Paris is the capital of France.",
        options: ["Paris", "London", "Berlin", "Rome"],
        answer: 0,
      },
    ],
  },

  // question 2: no big question body and explanation, 2 small questions
  {
    smallQuestions: [
      {
        body: "What is the capital of Germany?",
        explanation: "Berlin is the capital of Germany.",
        options: ["Paris", "London", "Berlin", "Rome"],
        answer: 2,
      },
      {
        body: "What is the capital of Japan?",
        explanation: "Tokyo is the capital of Japan.",
        options: ["Paris", "London", "Berlin", "Tokyo"],
        answer: 3,
      },
    ],
  },

  // question 3: with big question body and explanation, 1 small question
  {
    body: "This is big question body",
    explanation: "This is big question explanation",
    smallQuestions: [
      {
        body: "This is small question body",
        explanation: "This is small question explanation",
        options: ["a", "b", "c", "d"],
        answer: 0,
      },
    ],
  },
];
