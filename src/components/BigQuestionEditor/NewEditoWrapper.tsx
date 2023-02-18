import { useState } from "react";
import { BigQuestionEditorProvider } from "./context/BigQuestionEditorContext";
import { Editor } from "./BigQuestionEditor";
import { Operator } from "./Operator";
import { Previewer } from "./Previewer";
import type { BigQuestionType } from "../../types/bigQuestion";

type Props = {
  initialData?: BigQuestionType;
  onSubmit: (bigQuestion: BigQuestionType) => void;
};

export const EditorWrapper: React.FC<Props> = ({ initialData, onSubmit }) => {
  const [mode, setMode] = useState<"edit" | "preview">("edit");

  return (
    <BigQuestionEditorProvider initialData={initialData}>
      <div className="my-10">
        {mode === "edit" ? <Editor /> : <Previewer />}
      </div>

      <Operator
        mode={mode}
        onToggleMode={() => setMode(mode === "edit" ? "preview" : "edit")}
        onSubmit={onSubmit}
      />
    </BigQuestionEditorProvider>
  );
};
