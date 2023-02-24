import { SectionLayout } from "./components/SectionLayout";
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
      <SectionLayout title="大题题干">
        <PartEditor
          initialValue={body}
          onAdd={() => dispatch({ type: "bigQuestionBodyAdded" })}
          onRemove={() => dispatch({ type: "bigQuestionBodyRemoved" })}
          onChange={(content) => dispatch(changeBigQuestionBody(content))}
        />
      </SectionLayout>

      {/* 小题 */}
      <SmallQuestions />

      {/* --- 大题解析 --- */}
      <SectionLayout title="大题解析">
        <PartEditor
          initialValue={explanation}
          onAdd={() => dispatch({ type: "bigQuestionExplanationAdded" })}
          onRemove={() => dispatch({ type: "bigQuestionExplanationRemoved" })}
          onChange={(content) =>
            dispatch(changeBigQuestionExplanation(content))
          }
          allowFiller={false}
        />
      </SectionLayout>
    </div>
  );
};
