import { Button } from "../ui/Button";
import { useBigQuestionEditor } from "./context/ContextProvider";
import type { BigQuestionInputType } from "./schema";

type Props = {
  mode: "edit" | "preview";
  onToggleMode: () => void;
  onSubmit: (data: BigQuestionInputType) => void;
};

export const Operator: React.FC<Props> = ({ mode, onToggleMode, onSubmit }) => {
  const editor = useBigQuestionEditor();

  const handleSubmit = () => {
    // todo: remove as
    onSubmit(editor.data as BigQuestionInputType);
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
