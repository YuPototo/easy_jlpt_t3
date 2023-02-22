import type { BigQuestionType } from "../../types/bigQuestion";
import { Button } from "../ui/Button";
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
      <Button outline onClick={onToggleMode}>
        {mode === "edit" ? "预览" : "编辑"}
      </Button>

      {mode === "preview" ? (
        <Button intent="primary" onClick={handleSubmit}>
          提交
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};
