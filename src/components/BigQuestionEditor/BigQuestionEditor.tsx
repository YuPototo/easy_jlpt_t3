import {
  changeBigQuestionBody,
  changeBigQuestionExplanation,
  useBigQuestionEditor,
  useEditorDispatch,
} from "./context";
import { PartEditor } from "./PartEditor";
import { SmallQuestions } from "./SmallQuestions";

export const Editor: React.FC = () => {
  const editor = useBigQuestionEditor();
  const dispatch = useEditorDispatch();
  const data = editor.data;
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
        allowFiller={false}
      />
    </div>
  );
};
