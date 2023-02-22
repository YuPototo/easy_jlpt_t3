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

export const SmallQuestions: React.FC = () => {
  const editor = useBigQuestionEditor();
  const dispatch = useEditorDispatch();
  const data = editor.data;
  const smallQuestions = data?.smallQuestions || [];

  return (
    <div className="my-10">
      <div className="text-gray-50">Questions</div>

      {smallQuestions.map((smallQuestion, questionIndex) => (
        <div className="my-4 bg-green-50 py-2 px-2" key={uuid()}>
          <div>第 {questionIndex + 1} 小题</div>

          <button
            className="bg-red-100 p-2"
            onClick={() => dispatch(removeSmallQuestion(questionIndex))}
          >
            移除小题
          </button>

          <PartEditor
            title="小题题干"
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
          />

          <Options smallQuestionIndex={questionIndex} />

          <PartEditor
            title="小题解析"
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
          />
        </div>
      ))}

      <button
        className="bg-green-50 p-2"
        onClick={() => dispatch({ type: "smallQuestionAdded" })}
      >
        新增小题
      </button>
    </div>
  );
};
