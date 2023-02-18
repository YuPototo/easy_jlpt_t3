/**
 * 添加题目的页面
 */
import type { NextPage } from "next";
import { EditorWrapper } from "../../../../../../../components/BigQuestionEditor/NewEditoWrapper";
import { useSectionPath } from "../../../../../../../hooks/usePath";
import { api } from "../../../../../../../utils/api";
import toast from "react-hot-toast";

const AddBigQuestion: NextPage = () => {
  // get section info
  const { bookTitle, sectionTitle, router } = useSectionPath();

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

  // add big question
  const addBigQuestion = api.bigQuestion.add.useMutation({
    onSuccess: () => {
      toast.success("添加成功，即将跳转");
      setTimeout(() => {
        router.back();
      }, 500);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  if (!book || !section) {
    return <div>loading...</div>;
  }

  return (
    <main>
      <h1 className="mb-4">添加题目</h1>

      <div>
        <div>Book: {book?.title}</div>
        <div>Section: {section?.sectionTitle}</div>
      </div>

      <div className="m-4">
        <EditorWrapper
          onSubmit={(bigQuestion) => {
            addBigQuestion.mutate({
              ...bigQuestion,
              sectionId: section.sectionId,
            });
          }}
        />
      </div>
    </main>
  );
};

export default AddBigQuestion;
