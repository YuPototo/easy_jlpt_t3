import { PartEditor } from "./PartEditor";

type Props = {
  data: string[];
  onAddOption: () => void;
  onRemoveOption: (optionIndex: number) => void;
  onChangeContent: (optionIndex: number, newContent: string) => void;
};
const Options: React.FC<Props> = ({
  data,
  onAddOption,
  onRemoveOption,
  onChangeContent,
}) => {
  return (
    <div>
      {data.map((option, optionIndex) => (
        <div className="my-4 bg-purple-200 p-2" key={optionIndex}>
          <PartEditor
            title={`选项 ${optionIndex + 1}`}
            content={option}
            onRemove={() => onRemoveOption(optionIndex)}
            onChange={(newContent) => onChangeContent(optionIndex, newContent)}
          />
        </div>
      ))}

      <button className="bg-red-50 p-2" onClick={onAddOption}>
        添加选项
      </button>
    </div>
  );
};

export default Options;
