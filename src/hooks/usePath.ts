import { useRouter } from "next/router";

export function useBookPathParams() {
  const router = useRouter();
  const query = router.query;
  const bookTitle = query.bookTitle;

  if (Array.isArray(bookTitle)) {
    throw new Error("bookTitle is an array");
  }

  return { bookTitle, router };
}

export function useSectionPath() {
  const { bookTitle, router } = useBookPathParams();

  const sectionTitle = router.query.sectionTitle;

  if (Array.isArray(sectionTitle)) {
    throw new Error("sectionTitle is an array");
  }
  return { bookTitle, sectionTitle, router };
}
