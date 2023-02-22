import type { NextPage } from "next";
import { useState } from "react";
import { BigQuestion } from "@/components/BigQuestion";
import { useSectionPath } from "@/hooks/usePath";
import { api } from "@/utils/api";

const SectionPracticePage: NextPage = () => {
  const [index, setIndex] = useState(0);
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
  const bigQuestionId = bigQuestions ? bigQuestions[index] : undefined;

  const { data: bigQuestion } = api.bigQuestion.byId.useQuery(
    bigQuestionId as string,
    {
      enabled: !!bigQuestionId,
    }
  );

  const bigQuestionLengths = bigQuestions?.length;
  const hasNext = bigQuestionLengths ? index + 1 < bigQuestionLengths : false;

  const handleToNext = () => {
    setIsDone(false);
    if (hasNext) {
      setIndex(index + 1);
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
          <button className="mt-8 bg-blue-100 px-4 py-2" onClick={handleToNext}>
            {hasNext ? "Next" : "Finish"}
          </button>
        ) : (
          <></>
        )}
      </main>
    </>
  );
};

export default SectionPracticePage;
