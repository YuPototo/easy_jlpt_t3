import type { NextPage } from "next";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import AddSectionForm from "../../../../../components/AddSectionForm";
import { api } from "../../../../../utils/api";

const AddSectionPage: NextPage = () => {
  const router = useRouter();
  const query = router.query;
  const uniqueTitle = query.uniqueTitle as string;

  const { data: book } = api.book.byUniqueTitle.useQuery(uniqueTitle);

  const handleSuccess = () => {
    toast.success("添加成功，即将跳转");
    setTimeout(() => {
      void router.back();
    }, 1000);
  };

  return (
    <main>
      <h1>Add Section</h1>
      <div>Book: {book?.title} </div>

      {book ? (
        <AddSectionForm bookId={book.id} onSuccess={handleSuccess} />
      ) : (
        <></>
      )}
    </main>
  );
};

export default AddSectionPage;
