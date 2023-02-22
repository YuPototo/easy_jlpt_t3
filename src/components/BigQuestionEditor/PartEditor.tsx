/**
 * 一个单独的可移除的编辑器
 */
import SlateEditor from "@/lib/editor/SlateEditor";
import clsx from "clsx";
import { Button } from "../ui/Button";

type Props = {
  title?: string;
  content?: string | null;
  onRemove: () => void;
  onChange: (newContent: string) => void;
  onAdd?: () => void; // 有的时候不支持直接添加，比如 option 编辑器
  allowFiller?: boolean;
  layout?: "vertical" | "horizontal";
};

export const PartEditor: React.FC<Props> = ({
  title,
  content,
  onAdd,
  onRemove,
  onChange,
  allowFiller,
  layout = "vertical",
}) => {
  const handleClickBtn = () => {
    if (content) {
      onRemove();
    } else {
      onAdd && onAdd();
    }
  };
  return (
    <div
      className={clsx("my-4 rounded bg-gray-50 p-4", {
        "flex items-center gap-6": layout === "horizontal",
      })}
    >
      {title ? (
        <div className="mb-4 text-lg font-bold text-green-800">{title}</div>
      ) : (
        <></>
      )}

      <div className="flex flex-grow items-center gap-6">
        {content ? (
          <div className="flex-grow">
            <SlateEditor
              initialValue={content}
              onChange={(value) => onChange(value)}
              allowFiller={allowFiller}
            />
          </div>
        ) : (
          <></>
        )}
        <div>
          <Button intent="primary" outline onClick={handleClickBtn}>
            {content ? "移除" : "添加"}
          </Button>
        </div>
      </div>
    </div>
  );
};
