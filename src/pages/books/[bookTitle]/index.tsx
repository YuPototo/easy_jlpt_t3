import type { GetServerSidePropsContext, GetStaticPaths, NextPage } from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";
import { createInnerTRPCContext } from "@/server/api/trpc";
import { appRouter } from "@/server/api/root";
import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import { useBookPath } from "@/hooks/usePath";
import { SectionCard } from "@/components/ui/SectionCard";

export async function getStaticProps(
  context: GetServerSidePropsContext<{ bookTitle: string }>
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({}),
    transformer: superjson, // optional - adds superjson serialization
  });

  const bookTitle = context.params?.bookTitle as string;

  await ssg.book.byUniqueTitle.prefetch(bookTitle);

  return {
    props: {
      trpcState: ssg.dehydrate(),
      bookTitle,
    },
    // regenerate every 30 minutes
    revalidate: 60 * 30,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const books = await prisma.book.findMany({
    select: {
      uniqueTitle: true,
    },
  });
  return {
    paths: books.map((book) => ({
      params: {
        bookTitle: book.uniqueTitle,
      },
    })),
    fallback: "blocking",
  };
};

const Book: NextPage = () => {
  const { bookTitle, router } = useBookPath();
  const currentPath = router.asPath;

  // This query will be immediately available as it's prefetched.
  const { data: book } = api.book.byUniqueTitle.useQuery(bookTitle as string, {
    enabled: !!bookTitle,
  });

  // get sections
  const { data: sections } = api.section.byBookId.useQuery(book?.id as string, {
    enabled: !!book,
  });

  // get param
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f3f4f6] py-8 sm:px-6 lg:px-8">
      {book ? (
        <div>
          <h1 className="my-4 text-lg">{book.title}</h1>

          <ol className="flex flex-col gap-4">
            {sections?.map((section) => (
              <li key={section.id}>
                <SectionCard
                  title={section.title}
                  href={`${currentPath}/sections/${section.titleInUrl}`}
                />
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div>Not exists</div>
      )}
    </main>
  );
};

export default Book;
