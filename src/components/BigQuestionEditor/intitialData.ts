import { createRichText } from "../../lib/renderer/src";
import type {
  BigQuestionType,
  SmallQuestionType,
} from "../../types/bigQuestion";

export const INITIAL_SMALL_QUESTION: SmallQuestionType = {
  body: createRichText("这是小题 body"),
  options: [
    createRichText("a"),
    createRichText("b"),
    createRichText("c"),
    createRichText("d"),
  ],
  explanation: createRichText("这是小题的 expalantion"),
  answer: 0,
};

const INITIAL_BIG_QUESTION: BigQuestionType = {
  smallQuestions: [INITIAL_SMALL_QUESTION],
};

// create a deep copy of the initial small question
export function createSmallQuestion() {
  return JSON.parse(
    JSON.stringify(INITIAL_SMALL_QUESTION)
  ) as SmallQuestionType;
}

function createBigQuestion() {
  return JSON.parse(JSON.stringify(INITIAL_BIG_QUESTION)) as BigQuestionType;
}

export default createBigQuestion;
