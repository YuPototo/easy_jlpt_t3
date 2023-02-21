import { createContext, useState } from "react";
import type { BigQuestionType } from "@/types/bigQuestion";
import { MainBody } from "./MainBody";
import { MainExplanation } from "./MainExpalanation";
import SmallQuestion from "./SmallQuestion";

type BigQuestionContextType = {
  userAnswers: (number | null)[];
  optionPicked: (smallQuestionIndex: number, optionPicked: number) => void;
};

export const BigQuestionContext = createContext<BigQuestionContextType | null>(
  null
);

type Props = {
  data: BigQuestionType;
  onDone: () => void;
};

export const BigQuestion: React.FC<Props> = ({ data, onDone }) => {
  const [bigQuestionState, setBigQuestionState] = useState<
    Pick<BigQuestionContextType, "userAnswers">
  >({
    userAnswers: data.smallQuestions.map(() => null),
  });

  const { body, explanation, smallQuestions } = data;

  const handleOptionPicked = (
    smallQuestionIndex: number,
    optionPicked: number
  ) => {
    const newUserAnswers = [...bigQuestionState.userAnswers];
    newUserAnswers[smallQuestionIndex] = optionPicked;
    setBigQuestionState({ userAnswers: newUserAnswers });
    if (newUserAnswers.every((answer) => answer !== null)) {
      onDone();
    }
  };

  return (
    <BigQuestionContext.Provider
      value={{
        ...bigQuestionState,
        optionPicked: handleOptionPicked,
      }}
    >
      {body ? <MainBody content={body} /> : <></>}
      {smallQuestions.map((smallQuestion, index) => (
        <SmallQuestion
          data={smallQuestion}
          key={index}
          smallQuestionIndex={index}
        />
      ))}
      {explanation ? <MainExplanation content={explanation} /> : <></>}
    </BigQuestionContext.Provider>
  );
};
