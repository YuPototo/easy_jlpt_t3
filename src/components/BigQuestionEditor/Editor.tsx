import { useEditor, useEditorDispatch } from "./context/EditorContext";
import {
  changeBigQuestionBody,
  changeBigQuestionExplanation,
} from "./context/reducer";
import { PartEditor } from "./PartEditor";
import { SmallQuestions } from "./SmallQuestions";

export const Editor: React.FC = () => {
  const editor = useEditor();
  const dispatch = useEditorDispatch();
  const data = editor?.data;

  //   todo: why should I not assign default value to data?
  if (!data) {
    return <div className="text-red-500">editor data is undefined</div>;
  }

  //   todo: why should I not assign default value to data?
  if (!dispatch) {
    return <div className="text-red-500">dispatch is undefined</div>;
  }

  const { body, explanation } = data;

  return (
    <div>
      {/* --- 大题题干 --- */}
      <PartEditor
        title="大题题干"
        content={body}
        onAdd={() => dispatch({ type: "bigQuestionBodyAdded" })}
        onRemove={() => dispatch({ type: "bigQuestionBodyRemoved" })}
        onChange={(content) => dispatch(changeBigQuestionBody(content))}
      />

      <SmallQuestions />

      {/* --- 大题解析 --- */}
      <PartEditor
        title="解析"
        content={explanation}
        onAdd={() => dispatch({ type: "bigQuestionExplanationAdded" })}
        onRemove={() => dispatch({ type: "bigQuestionExplanationRemoved" })}
        onChange={(content) => dispatch(changeBigQuestionExplanation(content))}
      />
    </div>
  );
};
