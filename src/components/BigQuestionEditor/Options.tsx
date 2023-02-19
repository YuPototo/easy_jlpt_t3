import { PartEditor } from "./PartEditor";
import {
  removeOption,
  addOption,
  changeOption,
  useBigQuestionEditor,
  useEditorDispatch,
} from "./context";

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
    <div>
      {options.map((option, optionIndex) => (
        <div className="my-4 bg-purple-200 p-2" key={optionIndex}>
          <PartEditor
            title={`选项 ${optionIndex + 1}`}
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

      <button
        className="bg-red-50 p-2"
        onClick={() => dispatch(addOption(smallQuestionIndex))}
      >
        添加选项
      </button>
    </div>
  );
};

export default Options;
