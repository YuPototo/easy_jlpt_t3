import type { NextPage } from "next";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { AddBookForm } from "@/components/AddBookForm";

const AdminPage: NextPage = () => {
  const router = useRouter();
  const handleSuccess = (uniqueTitle: string) => {
    toast.success("添加成功，即将跳转");
    setTimeout(() => {
      void router.push(`/admin/books/${encodeURIComponent(uniqueTitle)}`);
    }, 1000);
  };
  return (
    <>
      <main className="flex min-h-screen flex-col items-center bg-gray-900 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-10 text-lg text-gray-50">新增练习册</h1>

        <div className="w-80">
          <AddBookForm onSuccess={handleSuccess} />
        </div>
      </main>
    </>
  );
};

export default AdminPage;
