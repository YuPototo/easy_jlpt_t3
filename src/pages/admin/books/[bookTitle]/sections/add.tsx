import type { NextPage } from "next";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { AddSectionForm } from "@/components/AddSectionForm";
import { api } from "@/utils/api";

const AddSectionPage: NextPage = () => {
  const router = useRouter();
  const query = router.query;
  const bookTitle = query.bookTitle as string;

  const { data: book } = api.book.byUniqueTitle.useQuery(bookTitle);

  const handleSuccess = () => {
    toast.success("添加成功，即将跳转");
    setTimeout(() => {
      void router.back();
    }, 1000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-900 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-lg text-gray-50">Add Section</h1>

      <div className="mb-10 text-gray-50">Book: {book?.title} </div>

      {book ? (
        <div className="w-80">
          <AddSectionForm bookId={book.id} onSuccess={handleSuccess} />
        </div>
      ) : (
        <></>
      )}
    </main>
  );
};

export default AddSectionPage;
