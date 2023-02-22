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
import { PartLayout } from "./components/PartLayout";

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
    <PartLayout title="选项">
      <div className="flex-grow">
        {options.map((option, optionIndex) => (
          <div key={uuid()}>
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
    </PartLayout>
  );
};

export default Options;
