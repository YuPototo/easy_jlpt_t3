/**
 * 添加题目的页面
 */
import type { NextPage } from "next";
import toast from "react-hot-toast";
import { EditorWrapper } from "@/components/BigQuestionEditor/EditoWrapper";
import { useBigQuestionPath } from "@/hooks/usePath";
import { api } from "@/utils/api";
import { useMemo } from "react";
import type { BigQuestionInputType } from "@/components/BigQuestionEditor/schema";
import { bigQuestionInputToBigQuestion } from "@/components/BigQuestionEditor/schema";
import { bigQuestionToBigQuestionInput } from "@/components/BigQuestionEditor/schema";

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
  const { data: rawBigQuestion } = api.bigQuestion.byId.useQuery(
    bigQuestionId as string,
    {
      enabled: !!bigQuestionId,
    }
  );

  const bigQuestion = useMemo(() => {
    return rawBigQuestion && bigQuestionToBigQuestionInput(rawBigQuestion);
  }, [rawBigQuestion]);

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

  const handleSubmit = (bigQuestionInput: BigQuestionInputType) => {
    if (!bigQuestionId) {
      throw Error("bigQuestionId is undefined");
    }

    const bigQuestion = bigQuestionInputToBigQuestion(bigQuestionInput);

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
