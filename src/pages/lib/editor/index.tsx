import SlateEditor from "@/lib/editor/SlateEditor";
import type { NextPage } from "next";
import { useState } from "react";

const initialValue = JSON.stringify([
  {
    type: "paragraph",
    children: [{ text: "This is a paragraph" }],
  },
]);

const EditorPage: NextPage = () => {
  const [value, setValue] = useState(initialValue);

  return (
    <>
      <main className="m-5">
        <h1>Editor</h1>

        <div className="mt-2">This page is for testing editor</div>

        <div className="mt-4">
          用于测试的图片地址：
          <div className="overflow-auto rounded bg-gray-100 p-2 text-sm text-gray-700">
            https://assets.riyu.love/images/cover/2a2b8743053c6c2bf43c2ecf333f1c87.png
          </div>
        </div>

        <div className="mt-4">
          富文本数据：
          <div className="overflow-auto rounded bg-gray-100 p-2 text-sm text-gray-700">
            {value}
          </div>
        </div>

        <div className="my-10">
          <SlateEditor
            initialValue={value}
            onChange={(value) => setValue(value)}
          />
        </div>
      </main>
    </>
  );
};

export default EditorPage;
