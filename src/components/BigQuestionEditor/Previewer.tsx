import { useEditor } from "./context/EditorContext";
import { BigQuestion } from "../BigQuestion";

export const Previewer: React.FC = () => {
  const editor = useEditor();
  const data = editor?.data;

  return (
    <div>
      <h2>Preview</h2>
      {data ? (
        <BigQuestion
          data={data}
          onDone={() => console.log("do nothing here")}
        />
      ) : (
        <div>editor data is undefined</div>
      )}
    </div>
  );
};
