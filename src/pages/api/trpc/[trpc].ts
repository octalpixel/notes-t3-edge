import { env } from "~/env.mjs";
import { appRouter } from "~/server/api/root";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";
import { db } from "~/server/db";

/**
 * Edge runtime fetch adapter
 */
export default async function handler(req: NextRequest) {
    return fetchRequestHandler({
        endpoint: "/api/trpc",
        router: appRouter,
        req,
        createContext: () => {
            return {
                db,
            };
        },
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
