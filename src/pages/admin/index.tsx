import type { NextPage } from "next";
import Link from "next/link";
import { api } from "@/utils/api";
import { BookCard } from "@/components/ui/BookCard";

const AdminPage: NextPage = () => {
  const { data: books } = api.book.all.useQuery();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center bg-gray-900 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-10 text-lg text-gray-50">管理员页面</h1>

        <div className="flex w-36 flex-col gap-4">
          {books ? (
            books.map((book) => (
              <BookCard
                key={book.id}
                title={book.title}
                href={`/admin/books/${encodeURIComponent(book.uniqueTitle)}`}
              />
            ))
          ) : (
            <div>loading books ...</div>
          )}
        </div>

        <div className="mt-16">
          <Link className="bg-red-100 p-2" href="/admin/books/add">
            + 新增一个册子
          </Link>
        </div>
      </main>
    </>
  );
};

export default AdminPage;
