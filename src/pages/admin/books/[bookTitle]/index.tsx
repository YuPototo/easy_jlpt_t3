import type { NextPage } from "next";
import Link from "next/link";
import { useBookPath } from "@/hooks/usePath";
import { api } from "@/utils/api";

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
      <main className="flex h-screen flex-col items-center">
        {bookTitle ? (
          book ? (
            <div>
              <h1>{book.title}</h1>
              <div>{book.createdAt.toString()}</div>

              <div>
                {sections?.map((section) => (
                  <Link
                    className="m-2 block p-2"
                    key={section.id}
                    href={`${currentPath}/sections/${section.titleInUrl}`}
                  >
                    {section.title}
                  </Link>
                ))}
              </div>

              <div>
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
