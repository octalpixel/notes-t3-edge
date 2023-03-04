import type { Note } from "@prisma/client/edge";
import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { env } from "~/env.mjs";

/**
 * Once you have your prisma.schema models set, you can import their generated types here from @prisma/client/edge
 */
interface Database {
    Note: Note;
}

export const db = new Kysely<Database>({
    dialect: new PlanetScaleDialect({
        host: "aws.connect.psdb.cloud",
        username: env.DATABASE_USERNAME,
        password: env.DATABASE_PASSWORD,
    }),
});
