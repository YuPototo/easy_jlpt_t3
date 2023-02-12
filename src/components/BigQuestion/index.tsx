import type { BigQuestionType } from "../../types/bigQuestion";
import MainBody from "./MainBody";
import MainExplanation from "./MainExpalanation";
import SmallQuestion from "./SmallQuestion";

type Props = {
  data: BigQuestionType;
};

const BigQuestion: React.FC<Props> = ({ data }) => {
  const { body, explanation, smallQuestions } = data;
  return (
    <div>
      {body ? <MainBody content={body} /> : <></>}
      {smallQuestions.map((smallQuestion, index) => (
        <SmallQuestion data={smallQuestion} key={index} />
      ))}
      {explanation ? <MainExplanation content={explanation} /> : <></>}
    </div>
  );
};

export default BigQuestion;
