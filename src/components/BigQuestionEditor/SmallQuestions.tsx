import { PartEditor } from "./PartEditor";
import { useEditor, useEditorDispatch } from "./context/EditorContext";
import {
  addSmallQuestionBody,
  changeSmallQuestionBody,
  removeSmallQuestionBody,
  addSmallQuestionExplanation,
  removeSmallQuestionExplanation,
  changeSmallQuestionExplanation,
  removeSmallQuestion,
} from "./context/reducer";
import Options from "./Options";

export const SmallQuestions: React.FC = () => {
  const editor = useEditor();
  const dispatch = useEditorDispatch();
  const data = editor?.data;
  const smallQuestions = data?.smallQuestions || [];

  // todo: why should I not assign default value to data?
  if (!dispatch) {
    return <div className="text-red-500">dispatch is undefined</div>;
  }

  return (
    <div className="my-10">
      <div>Questions</div>

      {smallQuestions.map((smallQuestion, questionIndex) => (
        <div className="my-4 bg-green-50 py-2 px-2" key={questionIndex}>
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
          />
        </div>
      ))}

      <button onClick={() => dispatch({ type: "smallQuestionAdded" })}>
        新增小题
      </button>
    </div>
  );
};