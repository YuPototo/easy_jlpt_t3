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
    <main>
      {isLoading ? <div className="font-lg m-4">加载中....</div> : <></>}

      <h1>{section?.sectionTitle}</h1>

      <div className="m-4">
        <Link
          className="bg-green-300 p-2"
          href={`${currentPath}/bigQuestions/add`}
        >
          添加题目
        </Link>
      </div>

      <div className="m-2">题目数量：{section?.bigQuestions.length}</div>

      <div>
        {section?.bigQuestions.map((id) => (
          <Link
            className="m-2 block p-2"
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
