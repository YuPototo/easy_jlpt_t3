import { Button } from "../ui/Button";
import { useBigQuestionContext } from "./context";

export const Operator: React.FC = () => {
  const { isDone, context } = useBigQuestionContext();

  const { giveUp } = context;

  return (
    <div className="my-6">
      {isDone ? (
        <></>
      ) : (
        <Button outline onClick={giveUp}>
          Show Answer
        </Button>
      )}
    </div>
  );
};
