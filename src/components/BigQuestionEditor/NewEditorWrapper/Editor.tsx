import { useEditor, useEditorDispatch } from "../context/EditorContext";
import { PartEditor } from "../PartEditor";

export const Editor: React.FC = () => {
  const editor = useEditor();
  const dispatch = useEditorDispatch();
  const data = editor?.data;

  if (!data) {
    return <div className="text-red-500">editor data is undefined</div>;
  }

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
        onChange={(content) =>
          dispatch({ type: "bigQuestionBodyChanged", payload: content })
        }
      />

      {/* --- 大题解析 --- */}
      <PartEditor
        title="解析"
        content={explanation}
        onAdd={() => dispatch({ type: "bigQuestionExplanationAdded" })}
        onRemove={() => dispatch({ type: "bigQuestionExplanationRemoved" })}
        onChange={(content) =>
          dispatch({ type: "bigQuestionExplanationChanged", payload: content })
        }
      />
    </div>
  );
};
