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
  if (!isPicked) return "bg-gray-100";

  // picked but not done
  if (!isDone) return "bg-gray-100 ring-2 ring-blue";

  if (isAnswer) {
    // picked, done and right
    return "bg-green-200";
  } else {
    // picked, done and wrong
    return "bg-red-200";
  }
}
