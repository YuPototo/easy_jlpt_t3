/**
 * 添加题目的页面
 */
import type { NextPage } from "next";
import toast from "react-hot-toast";
import { EditorWrapper } from "@/components/BigQuestionEditor/NewEditoWrapper";
import { useBigQuestionPath } from "@/hooks/usePath";
import { api } from "@/utils/api";
import type { BigQuestionType } from "@/types/bigQuestion";

const AddBigQuestion: NextPage = () => {
  // get section info
  const { bookTitle, sectionTitle, bigQuestionId, router } =
    useBigQuestionPath();

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

  // get big question
  const { data: bigQuestion } = api.bigQuestion.byId.useQuery(
    bigQuestionId as string,
    {
      enabled: !!bigQuestionId,
    }
  );

  const apiUtils = api.useContext();

  // update mutation
  const updateBigQuestion = api.bigQuestion.updateById.useMutation({
    onSuccess: () => {
      void apiUtils.bigQuestion.byId.invalidate();
      toast.success("修改成功，即将跳转");
      setTimeout(() => {
        router.back();
      }, 500);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = (bigQuestion: BigQuestionType) => {
    if (!bigQuestionId) {
      throw Error("bigQuestionId is undefined");
    }

    updateBigQuestion.mutate({
      ...bigQuestion,
      id: bigQuestionId,
    });
  };

  if (!book || !section || !bigQuestion) {
    return <div>loading...</div>;
  }

  return (
    <main className="min-h-scree bg-gray-900 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-lg text-gray-50">修改题目</h1>

      <div className="text-gray-50">
        <div>Book: {book?.title}</div>
        <div>Section: {section?.sectionTitle}</div>
      </div>

      <div className="m-4">
        <EditorWrapper initialData={bigQuestion} onSubmit={handleSubmit} />
      </div>
    </main>
  );
};

export default AddBigQuestion;
