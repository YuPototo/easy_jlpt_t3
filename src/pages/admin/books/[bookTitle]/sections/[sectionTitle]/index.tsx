import type { NextPage } from "next";
import Link from "next/link";
import { useSectionPath } from "@/hooks/usePath";
import { api } from "@/utils/api";

const SectionPage: NextPage = () => {
  // get section info
  const { bookTitle, sectionTitle, router } = useSectionPath();

  const currentPath = router.asPath;

  const { data: section, isLoading } = api.section.content.useQuery(
    {
      bookTitle,
      sectionTitleInUrl: sectionTitle,
    } as { bookTitle: string; sectionTitleInUrl: string },
    {
      enabled: !!bookTitle && !!sectionTitle,
    }
  );

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-900 py-8 sm:px-6 lg:px-8">
      {isLoading ? (
        <div className="font-lg m-4 text-gray-50">加载中....</div>
      ) : (
        <></>
      )}

      <h1 className="mb-8 text-lg text-gray-50">{section?.sectionTitle}</h1>

      <div className="m-4">
        <Link
          className="bg-green-300 p-2"
          href={`${currentPath}/bigQuestions/add`}
        >
          添加题目
        </Link>
      </div>

      <div className="m-2 text-gray-50">
        题目数量：{section?.bigQuestions.length}
      </div>

      <div>
        {section?.bigQuestions.map((id) => (
          <Link
            className="m-2 block bg-gray-50 p-2"
            key={id}
            href={`${currentPath}/bigQuestions/${id}`}
          >
            {id}
          </Link>
        ))}
      </div>
    </main>
  );
};

export default SectionPage;
