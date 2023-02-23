import { useState } from "react";
import { ContextProvider } from "./context/ContextProvider";
import { Editor } from "./BigQuestionEditor";
import { Operator } from "./Operator";
import { Previewer } from "./Previewer";
import type { BigQuestionInputType } from "@/types/bigQuestion";

type Props = {
  initialData?: BigQuestionInputType;
  onSubmit: (bigQuestion: BigQuestionInputType) => void;
};

export const EditorWrapper: React.FC<Props> = ({ initialData, onSubmit }) => {
  const [mode, setMode] = useState<"edit" | "preview">("edit");

  return (
    <ContextProvider initialData={initialData}>
      <div className="my-10">
        {mode === "edit" ? <Editor /> : <Previewer />}
      </div>

      <Operator
        mode={mode}
        onToggleMode={() => setMode(mode === "edit" ? "preview" : "edit")}
        onSubmit={onSubmit}
      />
    </ContextProvider>
  );
};
