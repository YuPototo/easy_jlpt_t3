type Props = {
  title: string;
  content?: string | null;
  onAdd?: () => void;
  onRemove: () => void;
};

const RemovableEditor: React.FC<Props> = ({
  title,
  content,
  onAdd,
  onRemove,
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
      {content ? <div>{JSON.stringify(content)}</div> : <></>}
      <button className="bg-blue-100 p-2" onClick={handleClickBtn}>
        {content ? "移除" : "添加"}
      </button>
    </div>
  );
};

export default RemovableEditor;
