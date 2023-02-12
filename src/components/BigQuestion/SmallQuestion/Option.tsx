import clsx from "clsx";
import { useContext } from "react";
import { BigQuestionContext } from "..";

type Props = {
  content: string;
  smallQuestionIndex: number;
  optionIndex: number;
  isAnswer: boolean;
};

const Option: React.FC<Props> = ({
  content,
  smallQuestionIndex,
  optionIndex,
  isAnswer,
}) => {
  const { isPicked, isDone, optionPicked } = useBigQuestionContext({
    smallQuestionIndex,
    optionIndex,
  });

  return (
    <div>
      <button
        className={clsx(
          "my-4 bg-yellow-50 py-2 px-4",
          backgroundColor({ isDone, isAnswer, isPicked })
        )}
        onClick={() => optionPicked(smallQuestionIndex, optionIndex)}
      >
        {content}
      </button>
    </div>
  );
};

const useBigQuestionContext = ({
  smallQuestionIndex,
  optionIndex,
}: {
  smallQuestionIndex: number;
  optionIndex: number;
}) => {
  const context = useContext(BigQuestionContext);

  if (!context) {
    throw new Error(
      "BigQuestionContext has to be used within <BigQuestionContext.Provider>"
    );
  }

  const isPicked = context.userAnswers[smallQuestionIndex] === optionIndex;
  const isDone = context.userAnswers.every((answer) => answer !== null);

  return { isPicked, isDone, optionPicked: context.optionPicked };
};

function backgroundColor({
  isDone,
  isAnswer,
  isPicked,
}: {
  isDone: boolean;
  isAnswer: boolean;
  isPicked: boolean;
}) {
  // not picked option
  if (!isPicked) return "bg-yellow-50";

  // picked but not done
  if (!isDone) return "bg-yellow-200";

  if (isAnswer) {
    // picked, done and right
    return "bg-green-200";
  } else {
    // picked, done and wrong
    return "bg-red-200";
  }
}

export default Option;
