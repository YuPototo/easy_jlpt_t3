import { useRouter } from "next/router";

export function useBookPath() {
  const router = useRouter();
  const query = router.query;
  const bookTitle = query.bookTitle;

  if (Array.isArray(bookTitle)) {
    throw new Error("bookTitle is an array");
  }

  return { bookTitle, router };
}

export function useSectionPath() {
  const { bookTitle, router } = useBookPath();

  const sectionTitle = router.query.sectionTitle;

  if (Array.isArray(sectionTitle)) {
    throw new Error("sectionTitle is an array");
  }
  return { bookTitle, sectionTitle, router };
}

export function useBigQuestionPath() {
  const { bookTitle, sectionTitle, router } = useSectionPath();

  const bigQuestionId = router.query.bigQuestionId;

  if (Array.isArray(bigQuestionId)) {
    throw new Error("bigQuestionId is an array");
  }

  return { bookTitle, sectionTitle, bigQuestionId, router };
}
