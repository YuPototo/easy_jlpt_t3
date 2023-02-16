import { createRichText } from "../../../lib/renderer/src";
import type { BigQuestionType } from "../../../types/bigQuestion";
import RemovableEditor from "./RemovableEditor";
import QuestionsEditor from "./QuestionsEditor";
import { createSmallQuestion } from "../intitialData";

type Props = {
  data: BigQuestionType;
  setData: (data: BigQuestionType) => void;
};

export type PartLocation =
  | {
      position: "main";
      part: "body" | "explanation";
    }
  | {
      position: "question";
      questionIndex: number;
      part: "body" | "explanation";
    }
  | {
      position: "question";
      questionIndex: number;
      part: "option";
      optionIndex?: number; // 删除时才需要 option index
    };

const Editor: React.FC<Props> = ({ data, setData }: Props) => {
  const { body, explanation, smallQuestions } = data;

  const handleAddPart = (location: PartLocation) => {
    if (location.position === "main") {
      setData({
        ...data,
        [location.part]: createRichText(""),
      });
    } else if (location.position === "question") {
      const newSmallQuestions = [...smallQuestions];
      const question = newSmallQuestions[location.questionIndex];
      if (!question) {
        throw new Error("index out of range");
      }
      if (location.part === "option") {
        const newOptions = [...question.options];
        newOptions.push(createRichText(""));
        question.options = newOptions;
        setData({
          ...data,
          smallQuestions: newSmallQuestions,
        });
      } else {
        question[location.part] = createRichText("");
        setData({
          ...data,
          smallQuestions: newSmallQuestions,
        });
      }
    }
  };

  const handleRemovePart = (location: PartLocation) => {
    if (location.position === "main") {
      setData({
        ...data,
        [location.part]: null,
      });
    } else if (location.position === "question") {
      const { questionIndex } = location;
      const newSmallQuestions = [...smallQuestions];
      const question = newSmallQuestions[questionIndex];
      if (!question) {
        throw new Error(`index ${questionIndex} out of range`);
      }

      if (location.part === "option") {
        const { optionIndex } = location;

        if (optionIndex === undefined) {
          throw new Error("optionIndex is undefined");
        }

        const newOptions = [...question.options];
        newOptions.splice(optionIndex, 1);
        question.options = newOptions;
        setData({
          ...data,
          smallQuestions: newSmallQuestions,
        });
      } else {
        question[location.part] = null;
        setData({
          ...data,
          smallQuestions: newSmallQuestions,
        });
      }
    }
  };

  const handleAddQuestion = () => {
    const newSmallQuestions = [...smallQuestions];
    newSmallQuestions.push(createSmallQuestion());
    setData({
      ...data,
      smallQuestions: newSmallQuestions,
    });
  };

  const handleRemoveQuestion = (questionIndex: number) => {
    const newSmallQuestions = [...smallQuestions];
    newSmallQuestions.splice(questionIndex, 1);
    setData({
      ...data,
      smallQuestions: newSmallQuestions,
    });
  };

  return (
    <div>
      <RemovableEditor
        title="题干"
        content={body}
        onAdd={() => handleAddPart({ position: "main", part: "body" })}
        onRemove={() => handleRemovePart({ position: "main", part: "body" })}
      />

      <QuestionsEditor
        questions={smallQuestions}
        onAddPart={(partLocation) => handleAddPart(partLocation)}
        onRemovePart={(partLocation) => handleRemovePart(partLocation)}
        onAddQuestion={handleAddQuestion}
        onRemoveQuestion={handleRemoveQuestion}
      />

      <RemovableEditor
        title="解析"
        content={explanation}
        onAdd={() => handleAddPart({ position: "main", part: "explanation" })}
        onRemove={() =>
          handleRemovePart({ position: "main", part: "explanation" })
        }
      />
    </div>
  );
};

export default Editor;
