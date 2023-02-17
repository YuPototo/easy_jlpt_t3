/**
 * 这是真正的编辑器，它负责渲染题目编辑器的各个部分
 */
import { createRichText } from "../../lib/renderer/src";
import type { BigQuestionType } from "../../types/bigQuestion";
import { PartEditor } from "./PartEditor";
import { QuestionsEditor } from "./Questions";
import { createSmallQuestion } from "./intitialData";

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

export const Editor: React.FC<Props> = ({ data, setData }: Props) => {
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

  const handleChangeContent = (location: PartLocation, newContent: string) => {
    if (location.position === "main") {
      setData({
        ...data,
        [location.part]: newContent,
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
        newOptions[optionIndex] = newContent;
        question.options = newOptions;
        setData({
          ...data,
          smallQuestions: newSmallQuestions,
        });
      } else {
        question[location.part] = newContent;
        setData({
          ...data,
          smallQuestions: newSmallQuestions,
        });
      }
    }
  };

  return (
    <div>
      {/* --- 大题题干 --- */}
      <PartEditor
        title="大题题干"
        content={body}
        onAdd={() => handleAddPart({ position: "main", part: "body" })}
        onRemove={() => handleRemovePart({ position: "main", part: "body" })}
        onChange={(newContent) =>
          handleChangeContent({ position: "main", part: "body" }, newContent)
        }
      />

      {/* --- 小题 --- */}
      <QuestionsEditor
        questions={smallQuestions}
        onAddPart={(partLocation) => handleAddPart(partLocation)}
        onRemovePart={(partLocation) => handleRemovePart(partLocation)}
        onAddQuestion={handleAddQuestion}
        onRemoveQuestion={handleRemoveQuestion}
        onChangeContent={handleChangeContent}
      />

      {/* --- 大题解析 --- */}
      <PartEditor
        title="解析"
        content={explanation}
        onAdd={() => handleAddPart({ position: "main", part: "explanation" })}
        onRemove={() =>
          handleRemovePart({ position: "main", part: "explanation" })
        }
        onChange={(newContent) =>
          handleChangeContent(
            { position: "main", part: "explanation" },
            newContent
          )
        }
      />
    </div>
  );
};
