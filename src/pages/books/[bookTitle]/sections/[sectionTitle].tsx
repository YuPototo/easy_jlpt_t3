import type { NextPage } from "next";
import { useState } from "react";
import { BigQuestion } from "../../../../components/BigQuestion";
import { useSectionPath } from "../../../../hooks/usePath";
import { api } from "../../../../utils/api";

const SectionPracticePage: NextPage = () => {
  const [index, setIndex] = useState(0);
  const [isDond, setIsDone] = useState(false);

  const { bookTitle, sectionTitle } = useSectionPath();

  const { data: section } = api.section.content.useQuery(
    {
      bookTitle,
      sectionTitleInUrl: sectionTitle,
    } as { bookTitle: string; sectionTitleInUrl: string },
    {
      enabled: !!bookTitle && !!sectionTitle,
    }
  );

  const bigQuestionId = section?.bigQuestions[index];

  const { data: bigQuestion } = api.bigQuestion.byId.useQuery(
    bigQuestionId as string,
    {
      enabled: !!bigQuestionId,
    }
  );

  const handleToNext = () => {
    setIsDone(false);
    setIndex(index + 1);
  };

  const handleDone = () => {
    setIsDone(true);
  };

  return (
    <>
      <main className="flex h-screen flex-col items-center">
        <div>section: {section?.sectionTitle} </div>
        {bigQuestion ? (
          <BigQuestion data={bigQuestion} onDone={handleDone} />
        ) : (
          <></>
        )}

        {isDond ? (
          <button className="mt-8 bg-blue-100 px-4 py-2" onClick={handleToNext}>
            Next
          </button>
        ) : (
          <></>
        )}
      </main>
    </>
  );
};

export default SectionPracticePage;
