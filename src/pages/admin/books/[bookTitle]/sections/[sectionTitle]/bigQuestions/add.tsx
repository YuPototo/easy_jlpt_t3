import type { NextPage } from "next";
import { useState } from "react";
import { EditorWrapper } from "../../../../../../../components/BigQuestionEditor/EditorWrapper";
import { useSectionPath } from "../../../../../../../hooks/usePath";
import { api } from "../../../../../../../utils/api";

const AddBigQuestion: NextPage = () => {
  const [mode, setMode] = useState<"edit" | "preview">("edit");

  // get section info
  const { bookTitle, sectionTitle } = useSectionPath();

  // book
  const { data: book } = api.book.byUniqueTitle.useQuery(bookTitle as string, {
    enabled: !!bookTitle,
  });

  // section
  const { data: section } = api.section.content.useQuery(
    {
      bookTitle,
      sectionTitleInUrl: sectionTitle,
    } as { bookTitle: string; sectionTitleInUrl: string },
    {
      enabled: !!bookTitle && !!sectionTitle,
    }
  );

  return (
    <main>
      <h1 className="mb-4">添加题目</h1>

      <div>
        <div>Book: {book?.title}</div>
        <div>Section: {section?.sectionTitle}</div>
      </div>

      <div className="m-4">
        <EditorWrapper
          mode={mode}
          toggleMode={() => setMode(mode === "edit" ? "preview" : "edit")}
          onSubmit={() => console.log("todo: 调用添加题目的 api")}
        />
      </div>
    </main>
  );
};

export default AddBigQuestion;
