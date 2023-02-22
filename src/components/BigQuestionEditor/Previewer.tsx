import { useBigQuestionEditor } from "./context/ContextProvider";
import { BigQuestion } from "../BigQuestion";

export const Previewer: React.FC = () => {
  const editor = useBigQuestionEditor();
  const data = editor.data;

  return (
    <div>
      <h2 className="text-gray-50">Preview</h2>
      {data ? (
        <BigQuestion
          data={data}
          onDone={() => console.log("do nothing here")}
        />
      ) : (
        <div className="text-gray-50">editor data is undefined</div>
      )}
    </div>
  );
};
