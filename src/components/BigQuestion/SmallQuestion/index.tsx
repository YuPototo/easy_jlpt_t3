import type { SmallQuestionType } from "../../../types/bigQuestion";
import Body from "./Body";
import Explanation from "./MainExpalanation";
import Option from "./Option";

type Props = {
  data: SmallQuestionType;
};

const SmallQuestion: React.FC<Props> = ({ data }) => {
  const { body, explanation, options } = data;
  return (
    <div>
      {body ? <Body content={body} /> : <></>}

      <button>
        {options.map((option, index) => (
          <Option content={option} key={index} />
        ))}
      </button>

      {explanation ? <Explanation content={explanation} /> : <></>}
    </div>
  );
};

export default SmallQuestion;
