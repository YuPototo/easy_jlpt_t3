import type { NextPage } from "next";
import { useState } from "react";
import { BigQuestion } from "@/components/BigQuestion";
import { useSectionPath } from "@/hooks/usePath";
import { api } from "@/utils/api";
import { Button } from "@/components/ui/Button";

const SectionPracticePage: NextPage = () => {
  const [bigQuestionIndex, setBigQuestionIndex] = useState(0);
  const [isDond, setIsDone] = useState(false);

  const { bookTitle, sectionTitle, router } = useSectionPath();

  const { data: section } = api.section.content.useQuery(
    {
      bookTitle,
      sectionTitleInUrl: sectionTitle,
    } as { bookTitle: string; sectionTitleInUrl: string },
    {
      enabled: !!bookTitle && !!sectionTitle,
    }
  );

  const bigQuestions = section?.bigQuestions;
  const bigQuestionId = bigQuestions
    ? bigQuestions[bigQuestionIndex]
    : undefined;

  const { data: bigQuestion } = api.bigQuestion.byId.useQuery(
    bigQuestionId as string,
    {
      enabled: !!bigQuestionId,
    }
  );

  const bigQuestionLengths = bigQuestions?.length;
  const hasNext = bigQuestionLengths
    ? bigQuestionIndex + 1 < bigQuestionLengths
    : false;

  const handleToNext = () => {
    setIsDone(false);
    if (hasNext) {
      setBigQuestionIndex(bigQuestionIndex + 1);
    } else {
      if (!bookTitle) {
        // 在这个函数里，应该已经获得了 bookTitle
        throw Error("bookTitle is undefined");
      }
      void router.replace(`/books/${bookTitle}`);
    }
  };

  const handleDone = () => {
    setIsDone(true);
  };

  return (
    <>
      <main className="flex h-screen flex-col items-center">
        <div className="my-4 text-gray-700">{section?.sectionTitle} </div>
        {bigQuestion ? (
          <BigQuestion data={bigQuestion} onDone={handleDone} />
        ) : (
          <></>
        )}

        {isDond ? (
          <Button onClick={handleToNext}>{hasNext ? "Next" : "Finish"}</Button>
        ) : (
          <></>
        )}
      </main>
    </>
  );
};

export default SectionPracticePage;
