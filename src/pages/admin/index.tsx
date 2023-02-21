import type { NextPage } from "next";
import Link from "next/link";
import { api } from "@/utils/api";

const AdminPage: NextPage = () => {
  const { data: books } = api.book.all.useQuery();

  return (
    <>
      <main className="">
        <div>This is admin page</div>

        {books ? (
          books.map((book) => (
            <div key={book.id}>
              <Link
                href={`/admin/books/${encodeURIComponent(book.uniqueTitle)}`}
              >
                {book.title}
              </Link>
            </div>
          ))
        ) : (
          <div>loading books ...</div>
        )}

        <div>
          <Link className="bg-red-100 p-2" href="/admin/books/add">
            Add Book
          </Link>
        </div>
      </main>
    </>
  );
};

export default AdminPage;
