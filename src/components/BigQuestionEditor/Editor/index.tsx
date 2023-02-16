import type { BigQuestionType } from "../../../types/bigQuestion";

type Props = {
  data: BigQuestionType;

  // 当任何一个 form 发生 change 时，就调用这个函数
  setData: (data: BigQuestionType) => void;
};

const Editor: React.FC<Props> = ({ data, setData }: Props) => {
  const { body, explanation } = data;

  return (
    <div>
      <div className="m-4">
        <div>Big Question Body</div>
        {body ? (
          <div>{JSON.stringify(body)}</div>
        ) : (
          <div>
            <button className="bg-blue-100 p-2">添加</button>
          </div>
        )}
      </div>

      <div className="m-4">
        <div>Big Question Expanation</div>
        {explanation ? (
          <div>{JSON.stringify(explanation)}</div>
        ) : (
          <div>
            <button className="bg-blue-100 p-2">添加</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;
