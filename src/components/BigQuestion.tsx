import type { BigQuestionType } from "../types/bigQuestion";

type Props = {
  data: BigQuestionType;
};

const BigQuestion: React.FC<Props> = ({ data }) => {
  return (
    <div>
      Todo: big question
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

export default BigQuestion;
