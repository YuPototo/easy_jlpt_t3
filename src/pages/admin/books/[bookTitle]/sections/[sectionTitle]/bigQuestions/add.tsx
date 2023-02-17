import type { NextPage } from "next";
import { EditorWrapper } from "../../../../../../../components/BigQuestionEditor/NewEditorWrapper/NewEditoWrapper";
import { useSectionPath } from "../../../../../../../hooks/usePath";
import { api } from "../../../../../../../utils/api";

const AddBigQuestion: NextPage = () => {
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
          onSubmit={() => console.log("todo: 调用添加题目的 api")}
        />
      </div>
    </main>
  );
};

export default AddBigQuestion;
