import type { NextPage } from "next";
import Link from "next/link";
import { useBookPath } from "@/hooks/usePath";
import { api } from "@/utils/api";
import { SectionCard } from "@/components/ui/SectionCard";

const Book: NextPage = () => {
  const { bookTitle, router } = useBookPath();
  const currentPath = router.asPath;

  const { data: book } = api.book.byUniqueTitle.useQuery(bookTitle as string, {
    enabled: !!bookTitle,
  });

  // get sections
  const { data: sections } = api.section.byBookId.useQuery(book?.id as string, {
    enabled: !!book,
  });

  // get param
  return (
    <>
      <main className="flex min-h-screen flex-col items-center bg-gray-900 py-8 sm:px-6 lg:px-8">
        {bookTitle ? (
          book ? (
            <div>
              <h1 className="mb-10 text-lg text-gray-50">{book.title}</h1>

              <div className="my-4 flex flex-col gap-4">
                {sections?.map((section) => (
                  <SectionCard
                    key={section.id}
                    title={section.title}
                    href={`${currentPath}/sections/${section.titleInUrl}`}
                  />
                ))}
              </div>

              <div className="mt-10">
                <Link
                  className="bg-green-300 p-2"
                  href={`${currentPath}/sections/add`}
                >
                  添加一个 Section
                </Link>
              </div>
            </div>
          ) : (
            <div>Not exists</div>
          )
        ) : (
          <></>
        )}
      </main>
    </>
  );
};

export default Book;
