import { createTRPCRouter } from "~/server/api/trpc";
import { notesRouter } from "~/server/api/routers/notes";
import { authRouter } from "./routers/auth";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    notes: notesRouter,
    auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
