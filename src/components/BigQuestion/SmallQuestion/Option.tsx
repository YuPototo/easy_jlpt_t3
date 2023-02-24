import clsx from "clsx";
import { useBigQuestionContext } from "../context";
import RichText from "@/lib/renderer/RichText";

type Props = {
  content: string;
  smallQuestionIndex: number;
  optionIndex: number;
  isAnswer: boolean;
};

export const Option: React.FC<Props> = ({
  content,
  smallQuestionIndex,
  optionIndex,
  isAnswer,
}) => {
  const { isPicked, isDone, optionPicked } = useOptionContext({
    smallQuestionIndex,
    optionIndex,
  });

  return (
    <div>
      <button
        className={clsx(
          "my-4 py-2 px-4",
          backgroundColor({ isDone, isAnswer, isPicked })
        )}
        onClick={() => optionPicked(smallQuestionIndex, optionIndex)}
      >
        <RichText data={content} />
      </button>
    </div>
  );
};

const useOptionContext = ({
  smallQuestionIndex,
  optionIndex,
}: {
  smallQuestionIndex: number;
  optionIndex: number;
}) => {
  const { isDone, context } = useBigQuestionContext();

  const isPicked = context.userAnswers[smallQuestionIndex] === optionIndex;

  return { isPicked, isDone, optionPicked: context.optionPicked };
};

// todo: refactor this function
function backgroundColor({
  isDone,
  isAnswer,
  isPicked,
}: {
  isDone: boolean;
  isAnswer: boolean;
  isPicked: boolean;
}) {
  if (!isDone) {
    if (isPicked) {
      return "bg-gray-100 ring-2 ring-blue";
    } else {
      return "bg-gray-100";
    }
  } else {
    if (isAnswer) {
      return "bg-green-200";
    } else {
      if (isPicked) {
        return "bg-red-200";
      } else {
        return "bg-gray-100";
      }
    }
  }
}
