import type { SmallQuestionType } from "@/types/bigQuestion";
import { Body } from "./Body";
import { Explanation } from "./Expalanation";
import { Option } from "./Option";

type Props = {
  data: SmallQuestionType;
  smallQuestionIndex: number;
};

const SmallQuestion: React.FC<Props> = ({ data, smallQuestionIndex }) => {
  const { body, explanation, options, answer } = data;

  return (
    <div>
      {body ? <Body content={body} /> : <></>}

      <div>
        {options.map((option, index) => (
          <Option
            content={option}
            key={index}
            smallQuestionIndex={smallQuestionIndex}
            optionIndex={index}
            isAnswer={index === answer}
          />
        ))}
      </div>

      {explanation ? <Explanation content={explanation} /> : <></>}
    </div>
  );
};

export default SmallQuestion;
