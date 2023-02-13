import type { BigQuestionType } from "../../../../src/types/bigQuestion";
import { makeParagraph } from "./utils";

/**
 * Question 1
 */

const body = [
  {
    type: "paragraph",
    children: [
      {
        text: "下面这个词会",
      },
      {
        text: "加粗",
        bold: true,
      },
      {
        text: "。",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "下面这个词会",
      },
      {
        text: "有下划线",
        underline: true,
      },
      {
        text: "。",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "下面这个词会",
      },
      {
        text: "有下划线且加粗",
        underline: true,
        bold: true,
      },
      {
        text: "。",
      },
    ],
  },
];

const questionOne: BigQuestionType = {
  smallQuestions: [
    {
      body: JSON.stringify(body),
      options: [makeParagraph("a"), makeParagraph("b"), makeParagraph("c")],
      answer: 0,
    },
  ],
};

const data = [questionOne];
export default data;
