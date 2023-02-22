import { PartEditor } from "./PartEditor";
import {
  removeOption,
  addOption,
  changeOption,
  useBigQuestionEditor,
  useEditorDispatch,
} from "./context";
import uuid from "react-uuid";
import { Button } from "../ui/Button";

type Props = {
  smallQuestionIndex: number;
};

const Options: React.FC<Props> = ({ smallQuestionIndex }) => {
  const editor = useBigQuestionEditor();
  const dispatch = useEditorDispatch();

  const smallQuestion = editor.data.smallQuestions[smallQuestionIndex];

  if (!smallQuestion) {
    return <div>Error: 没有第 ${smallQuestionIndex} 个 small question</div>;
  }

  const options = smallQuestion.options;

  return (
    <div className="flex items-center gap-6 pl-4">
      <div className="mb-4 text-lg font-bold text-green-800">选项</div>
      <div className="flex-grow">
        {options.map((option, optionIndex) => (
          <div className="my-4 p-2 " key={uuid()}>
            <PartEditor
              content={option}
              onRemove={() =>
                dispatch(removeOption({ smallQuestionIndex, optionIndex }))
              }
              onChange={(content) =>
                dispatch(
                  changeOption({
                    smallQuestionIndex,
                    optionIndex,
                    content,
                  })
                )
              }
              allowFiller={false}
            />
          </div>
        ))}
        <Button outline onClick={() => dispatch(addOption(smallQuestionIndex))}>
          添加选项
        </Button>
      </div>
    </div>
  );
};

export default Options;
