import { PartEditor } from "./PartEditor";
import { useEditor, useEditorDispatch } from "./context/EditorContext";
import { removeOption, addOption, changeOption } from "./context/reducer";

type Props = {
  smallQuestionIndex: number;
};

const Options: React.FC<Props> = ({ smallQuestionIndex }) => {
  const editor = useEditor();
  const dispatch = useEditorDispatch();

  const smallQuestion = editor?.data.smallQuestions[smallQuestionIndex];

  if (!smallQuestion) {
    return <div>Error: 没有 small question 啊</div>;
  }

  if (!dispatch) {
    return <div>Error: 没有 dispatch 啊</div>;
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
