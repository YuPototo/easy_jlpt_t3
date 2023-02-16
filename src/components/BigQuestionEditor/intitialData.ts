import { createRichText } from "../../lib/renderer/src";
import type { BigQuestionType } from "../../types/bigQuestion";

const INITIAL_BIG_QUESTION: BigQuestionType = {
  smallQuestions: [
    {
      body: createRichText("这是小题 body"),
      options: [
        createRichText("a"),
        createRichText("b"),
        createRichText("c"),
        createRichText("d"),
      ],
      explanation: createRichText("这是小题的 expalantion"),
      answer: 0,
    },
  ],
};

export default INITIAL_BIG_QUESTION;
