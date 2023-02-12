import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import BigQuestion from "../../../../components/BigQuestion";
import { api } from "../../../../utils/api";

const SectionPracticePage: NextPage = () => {
  const [index, setIndex] = useState(0);
  const [isDond, setIsDone] = useState(false);

  const router = useRouter();
  const query = router.query;
  const bookTitle = query.bookTitle as string;
  const sectionTitle = query.sectionTitle as string;

  const { data: section } = api.section.content.useQuery(
    {
      bookTitle,
      sectionTitleInUrl: sectionTitle,
    },
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
