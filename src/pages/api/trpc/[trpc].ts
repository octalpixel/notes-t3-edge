import { env } from "~/env.mjs";
import { appRouter } from "~/server/api/root";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";
import { db } from "~/server/db";
import { getAuth } from "@clerk/nextjs/server";

/**
 * Edge runtime fetch adapter
 */
export default async function handler(req: NextRequest) {
    const session = getAuth(req);
    console.log("--- TRPC Handler ---");
    console.log("Session:", session);
    console.log("UserId:", session.userId);
    console.log("--- End TRPC Handler ---");

    return fetchRequestHandler({
        endpoint: "/api/trpc",
        router: appRouter,
        req,
        createContext: () => ({ db, session }),
        onError:
            env.NODE_ENV === "development"
                ? ({ path, error }) => {
                      console.error(
                          `❌ tRPC failed on ${path ?? "<no-path>"}: ${
                              error.message
                          }`
                      );
                  }
                : undefined,
    });
}

export const config = {
    runtime: "experimental-edge",
    regions: "gru1",
};
