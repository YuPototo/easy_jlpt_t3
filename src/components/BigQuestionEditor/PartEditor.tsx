/**
 * 一个单独的可移除的编辑器
 */
import SlateEditor from "@/lib/editor/SlateEditor";
import { Button } from "../ui/Button";

type Props = {
  content?: string | null;
  onRemove: () => void;
  onChange: (newContent: string) => void;
  onAdd?: () => void; // 有的时候不支持直接添加，比如 option 编辑器
  allowFiller?: boolean;
};

export const PartEditor: React.FC<Props> = ({
  content,
  onAdd,
  onRemove,
  onChange,
  allowFiller,
}) => {
  const handleClickBtn = () => {
    if (content) {
      onRemove();
    } else {
      onAdd && onAdd();
    }
  };
  return (
    <div className={"rounded bg-gray-50 p-4"}>
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
          <Button
            size="small"
            intent="secondary"
            outline
            onClick={handleClickBtn}
          >
            {content ? "移除" : "添加"}
          </Button>
        </div>
      </div>
    </div>
  );
};
