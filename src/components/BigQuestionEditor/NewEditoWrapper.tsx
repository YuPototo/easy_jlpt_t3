import { useState } from "react";
import { EditorProvider } from "./context/EditorContext";
import { Editor } from "./Editor";
import { Operator } from "./Operator";
import { Previewer } from "./Previewer";

type Props = {
  onSubmit: () => void;
};

export const EditorWrapper: React.FC<Props> = () => {
  const [mode, setMode] = useState<"edit" | "preview">("edit");

  return (
    <EditorProvider>
      <div className="my-10">
        {mode === "edit" ? <Editor /> : <Previewer />}
      </div>

      <Operator
        mode={mode}
        onToggleMode={() => setMode(mode === "edit" ? "preview" : "edit")}
      />
    </EditorProvider>
  );
};
