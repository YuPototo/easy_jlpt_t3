import type { BigQuestionType } from "../../types/bigQuestion";
import { useBigQuestionEditor } from "./context/ContextProvider";

type Props = {
  mode: "edit" | "preview";
  onToggleMode: () => void;
  onSubmit: (data: BigQuestionType) => void;
};

export const Operator: React.FC<Props> = ({ mode, onToggleMode, onSubmit }) => {
  const editor = useBigQuestionEditor();

  const handleSubmit = () => {
    onSubmit(editor.data);
  };

  return (
    <div className="flex gap-4">
      <button
        className="
        rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700
    "
        onClick={onToggleMode}
      >
        {mode === "edit" ? "预览" : "编辑"}
      </button>

      {mode === "preview" ? (
        <button
          className="
        rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700
    "
          onClick={handleSubmit}
        >
          提交
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};
