// 必须从源文件引入，否则因为 tsx 报错
import { createRichText } from "@/lib/renderer/createRichText";
import { nanoid } from "@/lib/renderer/utils/nanoid";
import type { PartialBy } from "@/lib/typeUtils/optional";
import type { BigQuestionInputType, SmallQuestionInputType } from "./schema";

export type InitialSmallQuestion = PartialBy<SmallQuestionInputType, "answer">;

export const INITIAL_SMALL_QUESTION: InitialSmallQuestion = {
  uuid: nanoid(),
  body: createRichText("这是小题 body"),
  options: [
    {
      uuid: nanoid(),
      content: createRichText("a"),
    },
    {
      uuid: nanoid(),
      content: createRichText("b"),
    },
    {
      uuid: nanoid(),
      content: createRichText("c"),
    },
  ],
  explanation: createRichText("这是小题的 expalantion"),
};

export type InitialBigQuesiton = Omit<
  BigQuestionInputType,
  "smallQuestions"
> & {
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
