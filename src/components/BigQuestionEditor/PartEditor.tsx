/**
 * 一个单独的可移除的编辑器
 */
import SlateEditor from "@/lib/editor/SlateEditor";
import clsx from "clsx";
import { Button } from "../ui/Button";

type Props = {
  initialValue?: string | null;
  onRemove: () => void;
  onChange: (newContent: string) => void;
  onAdd?: () => void; // 有的时候不支持直接添加，比如 option 编辑器
  allowFiller?: boolean;
  bgColor?: string;
};

export const PartEditor: React.FC<Props> = ({
  initialValue,
  onAdd,
  onRemove,
  onChange,
  allowFiller,
  bgColor = "bg-gray-50",
}) => {
  const handleClickBtn = () => {
    if (initialValue) {
      onRemove();
    } else {
      onAdd && onAdd();
    }
  };

  return (
    <div className={clsx("rounded  p-4", bgColor)}>
      <div className="flex flex-grow items-center gap-6">
        {initialValue ? (
          <div className="flex-grow">
            <SlateEditor
              initialValue={initialValue}
              onChange={(value) => onChange(value)}
              allowFiller={allowFiller}
            />
          </div>
        ) : (
          <></>
        )}
        <div>
          <Button
            size="small"
            intent="secondary"
            outline
            onClick={handleClickBtn}
          >
            {initialValue ? "移除" : "添加"}
          </Button>
        </div>
      </div>
    </div>
  );
};
