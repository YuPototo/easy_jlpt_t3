/**
 * 一个单独的可移除的编辑器
 */
import { createRichText } from "../../../lib/renderer/src";

type Props = {
  title: string;
  content?: string | null;
  onRemove: () => void;
  onChange: (newContent: string) => void;
  onAdd?: () => void; // 有的时候不支持直接添加，比如 option 编辑器
};

export const PartEditor: React.FC<Props> = ({
  title,
  content,
  onAdd,
  onRemove,
  onChange,
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
      {content ? <div>{content}</div> : <></>}
      <button className="bg-blue-100 p-2" onClick={handleClickBtn}>
        {content ? "移除" : "添加"}
      </button>

      <button
        className="ml-4 bg-red-50"
        onClick={() => onChange(createRichText("after change"))}
      >
        临时：会改变content
      </button>
    </div>
  );
};
