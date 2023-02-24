import { createContext, useContext } from "react";

export type BigQuestionContextType = {
  userAnswers: (number | null)[];
  optionPicked: (smallQuestionIndex: number, optionPicked: number) => void;
  giveUp: () => void; // 直接展示答案
};

export const BigQuestionContext = createContext<BigQuestionContextType | null>(
  null
);

export const useBigQuestionContext = () => {
  const context = useContext(BigQuestionContext);

  if (!context) {
    throw new Error(
      "BigQuestionContext has to be used within <BigQuestionContext.Provider>"
    );
  }

  const isDone = context.userAnswers.every((answer) => answer !== null);

  return { isDone, context };
};
