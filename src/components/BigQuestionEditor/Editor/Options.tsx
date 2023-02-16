import RemovableEditor from "./RemovableEditor";

type Props = {
  data: string[];
  onAddOption: () => void;
  onRemoveOption: (optionIndex: number) => void;
};
const Options: React.FC<Props> = ({ data, onAddOption, onRemoveOption }) => {
  return (
    <div>
      {data.map((option, optionIndex) => (
        <div className="my-4 bg-purple-200 p-2" key={optionIndex}>
          <RemovableEditor
            title={`选项 ${optionIndex + 1}`}
            content={option}
            onRemove={() => onRemoveOption(optionIndex)}
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
