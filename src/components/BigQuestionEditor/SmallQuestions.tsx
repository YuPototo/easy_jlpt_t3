import { PartEditor } from "./PartEditor";
import {
  useBigQuestionEditor,
  useEditorDispatch,
} from "./context/ContextProvider";
import {
  addSmallQuestionBody,
  changeSmallQuestionBody,
  removeSmallQuestionBody,
  addSmallQuestionExplanation,
  removeSmallQuestionExplanation,
  changeSmallQuestionExplanation,
  removeSmallQuestion,
} from "./context";
import Options from "./Options";
import uuid from "react-uuid";
import { Divider } from "../ui/Divider";
import { Button } from "../ui/Button";

export const SmallQuestions: React.FC = () => {
  const editor = useBigQuestionEditor();
  const dispatch = useEditorDispatch();
  const data = editor.data;
  const smallQuestions = data?.smallQuestions || [];

  return (
    <>
      {smallQuestions.map((smallQuestion, questionIndex) => (
        <div className="my-10 rounded bg-gray-50 p-4" key={uuid()}>
          <div className="mb-4 text-lg font-bold text-green-800">
            第 {questionIndex + 1} 小题
          </div>

          <Button
            intent="secondary"
            outline
            onClick={() => dispatch(removeSmallQuestion(questionIndex))}
          >
            移除小题
          </Button>

          <PartEditor
            title="题干"
            content={smallQuestion.body}
            onAdd={() => dispatch(addSmallQuestionBody(questionIndex))}
            onRemove={() => dispatch(removeSmallQuestionBody(questionIndex))}
            onChange={(content) =>
              dispatch(
                changeSmallQuestionBody({
                  smallQuestionIndex: questionIndex,
                  content,
                })
              )
            }
            layout="horizontal"
          />

          <Divider />

          <Options smallQuestionIndex={questionIndex} />

          <Divider />

          <PartEditor
            title="解析"
            content={smallQuestion.explanation}
            onAdd={() => dispatch(addSmallQuestionExplanation(questionIndex))}
            onRemove={() =>
              dispatch(removeSmallQuestionExplanation(questionIndex))
            }
            onChange={(content) =>
              dispatch(
                changeSmallQuestionExplanation({
                  smallQuestionIndex: questionIndex,
                  content,
                })
              )
            }
            allowFiller={false}
            layout="horizontal"
          />
        </div>
      ))}

      <Button outline onClick={() => dispatch({ type: "smallQuestionAdded" })}>
        新增小题
      </Button>
    </>
  );
};
