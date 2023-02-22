import type { NextPage } from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";
import { appRouter } from "../server/api/root";
import { createInnerTRPCContext } from "../server/api/trpc";
import { api } from "../utils/api";
import { BookCard } from "@/components/ui/BookCard";

export async function getStaticProps() {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({}),
    transformer: superjson, // optional - adds superjson serialization
  });

  await ssg.book.all.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    // regenerate every 30 minutes
    revalidate: 60 * 30,
  };
}

const Home: NextPage = () => {
  // This query will be immediately available as it's prefetched.
  const { data: books } = api.book.all.useQuery();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center bg-[#f3f4f6] py-8 sm:px-6 lg:px-8">
        <div>Easy JLPT</div>

        {books ? (
          <div className="my-4 flex flex-col gap-4">
            {books.map((book) => (
              <BookCard
                key={book.id}
                title={book.title}
                href={`/books/${encodeURIComponent(book.uniqueTitle)}`}
              />
            ))}
          </div>
        ) : (
          <div>loading...</div>
        )}
      </main>
    </>
  );
};

export default Home;
