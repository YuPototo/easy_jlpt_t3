import { useBigQuestionEditor } from "./context/ContextProvider";
import { BigQuestion } from "../BigQuestion";
import { BigQuestionSchema } from "@/types/bigQuestion";
import { fromZodError } from "zod-validation-error";
import type { BigQuestionInputType } from "./schema";
import { bigQuestionInputToBigQuestion } from "./schema";

export const Previewer: React.FC = () => {
  const editor = useBigQuestionEditor();
  const data = editor.data;

  const bigQuestion = bigQuestionInputToBigQuestion(
    // todo: remove as
    data as BigQuestionInputType
  );

  const parseResult = BigQuestionSchema.safeParse(bigQuestion);

  return (
    <div>
      <h2 className="text-gray-50">Preview</h2>
      {parseResult.success ? (
        <BigQuestion
          data={parseResult.data}
          onDone={() => console.log("do nothing here")}
        />
      ) : (
        <div>
          题目不完整：
          {fromZodError(parseResult.error).message}
        </div>
      )}
    </div>
  );
};
