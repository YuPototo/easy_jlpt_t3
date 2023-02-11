import type { GetServerSidePropsContext, GetStaticPaths, NextPage } from "next";
import { useRouter } from "next/router";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";
import { createInnerTRPCContext } from "../../server/api/trpc";
import { appRouter } from "../../server/api/root";
import { prisma } from "../../server/db";
import { api } from "../../utils/api";

export async function getStaticProps(
  context: GetServerSidePropsContext<{ uniqueTitle: string }>
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({}),
    transformer: superjson, // optional - adds superjson serialization
  });

  const uniqueTitle = context.params?.uniqueTitle as string;

  await ssg.book.byUniqueTitle.prefetch(uniqueTitle);

  return {
    props: {
      trpcState: ssg.dehydrate(),
      uniqueTitle,
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
        uniqueTitle: book.uniqueTitle,
      },
    })),
    fallback: "blocking",
  };
};

const Book: NextPage = () => {
  const router = useRouter();
  const query = router.query;
  const uniqueTitle = query.uniqueTitle as string;

  // This query will be immediately available as it's prefetched.
  const { data: book } = api.book.byUniqueTitle.useQuery(uniqueTitle);

  // get sections
  const { data: sections } = api.section.byBookId.useQuery(book?.id as string, {
    enabled: !!book,
  });

  // get param
  return (
    <>
      <main className="flex h-screen flex-col items-center">
        {book ? (
          <div>
            <h1>{book.title}</h1>
            <div>{book.createdAt.toString()}</div>

            <div>
              {sections?.map((section) => (
                <div key={section.id}>
                  <h2>{section.title}</h2>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>Not exists</div>
        )}
      </main>
    </>
  );
};

export default Book;
