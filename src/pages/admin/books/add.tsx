import type { NextPage } from "next";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { AddBookForm } from "../../../components/AddBookForm";

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
      <main className="">
        <h1>新增练习册</h1>
        <AddBookForm onSuccess={handleSuccess} />
      </main>
    </>
  );
};

export default AdminPage;
