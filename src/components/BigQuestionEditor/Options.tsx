import { PartEditor } from "./PartEditor";
import {
  removeOption,
  addOption,
  changeOption,
  useBigQuestionEditor,
  useEditorDispatch,
  answerChanged,
} from "./context";
import { Button } from "../ui/Button";
import { PartLayout } from "./components/PartLayout";
import { Check } from "react-bootstrap-icons";
import clsx from "clsx";

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
  const answer = smallQuestion.answer;

  console.log(options);
  return (
    <PartLayout title="选项">
      <div className="flex-grow">
        {options.map((option, optionIndex) => (
          <div
            className={clsx("flex items-center gap-4 pl-2", {
              "bg-green-100": answer === optionIndex,
            })}
            key={option.uuid}
          >
            <div
              className={clsx(
                "rounded border p-1 hover:cursor-pointer hover:bg-green-300 ",
                answer === optionIndex ? "bg-green-200" : "bg-white"
              )}
              onClick={() =>
                dispatch(answerChanged({ smallQuestionIndex, optionIndex }))
              }
            >
              <Check
                className={clsx(
                  answer === optionIndex ? "text-green-700" : "text-gray-300"
                )}
                size={30}
              />
            </div>
            <div className="flex-grow">
              <PartEditor
                bgColor={answer === optionIndex ? "bg-green-100" : undefined}
                initialValue={option.content}
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
          </div>
        ))}

        {/* 没有选择答案的提示 */}
        {answer === undefined ? (
          <div className=" text-red-600">还没有选择答案</div>
        ) : (
          <></>
        )}

        <div className="mt-2">
          <Button
            outline
            onClick={() => dispatch(addOption(smallQuestionIndex))}
          >
            添加选项
          </Button>
        </div>
      </div>
    </PartLayout>
  );
};

export default Options;
