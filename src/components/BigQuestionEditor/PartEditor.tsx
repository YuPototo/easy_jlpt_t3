/**
 * 一个单独的可移除的编辑器
 */
import SlateEditor from "../../lib/editor/SlateEditor";

type Props = {
  title: string;
  content?: string | null;
  onRemove: () => void;
  onChange: (newContent: string) => void;
  onAdd?: () => void; // 有的时候不支持直接添加，比如 option 编辑器
  allowFiller?: boolean;
};

export const PartEditor: React.FC<Props> = ({
  title,
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
    <div className="my-4">
      <div>{title}</div>
      {content ? (
        <SlateEditor
          initalValue={content}
          onChange={(value) => onChange(value)}
          allowFiller={allowFiller}
        />
      ) : (
        <></>
      )}
      <button className="bg-blue-100 p-2" onClick={handleClickBtn}>
        {content ? "移除" : "添加"}
      </button>
    </div>
  );
};
