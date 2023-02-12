import { createTRPCRouter } from "./trpc";
import { bookRouter } from "./routers/book";
import { sectionRouter } from "./routers/section";
import { bigQuestionRouter } from "./routers/bigQuestion";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  book: bookRouter,
  section: sectionRouter,
  bigQuestion: bigQuestionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
