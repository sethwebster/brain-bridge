import { createTRPCRouter } from "~/server/api/trpc";
import { trainingSet } from "./routers/trainingSets";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  trainingSets: trainingSet
});

// export type definition of API
export type AppRouter = typeof appRouter;
