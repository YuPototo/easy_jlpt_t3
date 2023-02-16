import type { PartLocation } from ".";
import type { SmallQuestionType } from "../../../types/bigQuestion";
import Options from "./Options";
import RemovableEditor from "./RemovableEditor";

export type ActionFunction = (partLocation: PartLocation) => void;

type Props = {
  questions: SmallQuestionType[];
  onAddPart: ActionFunction;
  onRemovePart: ActionFunction;
  onAddQuestion: () => void;
  onRemoveQuestion: (questionIndex: number) => void;
};

const QuestionsEditor: React.FC<Props> = ({
  questions,
  onAddPart,
  onRemovePart,
  onAddQuestion,
  onRemoveQuestion,
}) => {
  return (
    <div className="my-10">
      <div>Questions</div>

      {questions.map((question, questionIndex) => (
        <div className="my-4 bg-green-50 py-2 px-2" key={questionIndex}>
          <div>第 {questionIndex + 1} 小题</div>

          <button
            className="bg-red-100 p-2"
            onClick={() => onRemoveQuestion(questionIndex)}
          >
            移除小题
          </button>

          <RemovableEditor
            title="题干"
            content={question.body}
            onAdd={() =>
              onAddPart({
                position: "question",
                part: "body",
                questionIndex,
              })
            }
            onRemove={() =>
              onRemovePart({
                position: "question",
                part: "body",
                questionIndex,
              })
            }
          />

          <Options
            data={question.options}
            onAddOption={() =>
              onAddPart({
                position: "question",
                part: "option",
                questionIndex,
              })
            }
            onRemoveOption={(optionIndex) =>
              onRemovePart({
                position: "question",
                part: "option",
                questionIndex,
                optionIndex,
              })
            }
          />

          <RemovableEditor
            title="解析"
            content={question.explanation}
            onAdd={() =>
              onAddPart({
                position: "question",
                part: "explanation",
                questionIndex,
              })
            }
            onRemove={() =>
              onRemovePart({
                position: "question",
                part: "explanation",
                questionIndex,
              })
            }
          />
        </div>
      ))}

      <button onClick={onAddQuestion}>新增小题</button>
    </div>
  );
};

export default QuestionsEditor;
