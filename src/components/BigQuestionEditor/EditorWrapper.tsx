/**
 * Editor Wrapper 有两种模式，编辑和预览
 * 这个 component 里会存储临时的题目数据
 */
import { useState } from "react";
import type { BigQuestionType } from "../../types/bigQuestion";
import { BigQuestion } from "../BigQuestion";
import { Editor } from "./Editor";
import { createBigQuestion } from "./intitialData";

type Props = {
  mode: "edit" | "preview";
  toggleMode: () => void;
  // todo: onSubmit 的 param 需要题目的内容
  onSubmit: () => void;
};

export const EditorWrapper: React.FC<Props> = ({ mode, toggleMode }) => {
  const [data, setData] = useState<BigQuestionType>(createBigQuestion());

  return (
    <div>
      <div className="my-10">
        {mode === "edit" ? (
          <Editor data={data} setData={setData} />
        ) : (
          <BigQuestion
            data={data}
            onDone={() => console.log("maybe do nothing here")}
          />
        )}
      </div>

      <div className="flex gap-4">
        <button
          className="
              rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700
          "
          onClick={toggleMode}
        >
          {mode === "edit" ? "预览" : "编辑"}
        </button>

        {mode === "preview" ? (
          <button
            className="
              rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700
          "
          >
            提交
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
