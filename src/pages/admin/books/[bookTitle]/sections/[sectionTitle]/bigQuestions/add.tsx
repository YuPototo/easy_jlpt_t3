import type { NextPage } from "next";
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
    </main>
  );
};

export default AddBigQuestion;
