// 必须从源文件引入，否则因为 tsx 报错
import { createRichText } from "@/lib/renderer/createRichText";
import type { PartialBy } from "@/lib/typeUtils/optional";
import type { BigQuestionType, SmallQuestionType } from "@/types/bigQuestion";

export type InitialSmallQuestion = PartialBy<SmallQuestionType, "answer">;

export const INITIAL_SMALL_QUESTION: InitialSmallQuestion = {
  body: createRichText("这是小题 body"),
  options: [
    createRichText("a"),
    createRichText("b"),
    createRichText("c"),
    createRichText("d"),
  ],
  explanation: createRichText("这是小题的 expalantion"),
};

export type InitialBigQuesiton = Omit<BigQuestionType, "smallQuestions"> & {
  smallQuestions: InitialSmallQuestion[];
};

const INITIAL_BIG_QUESTION: InitialBigQuesiton = {
  smallQuestions: [INITIAL_SMALL_QUESTION],
};

// create a deep copy of the initial small question
export function createSmallQuestion() {
  return JSON.parse(
    JSON.stringify(INITIAL_SMALL_QUESTION)
  ) as InitialSmallQuestion;
}

export function createBigQuestion() {
  return JSON.parse(JSON.stringify(INITIAL_BIG_QUESTION)) as InitialBigQuesiton;
}
