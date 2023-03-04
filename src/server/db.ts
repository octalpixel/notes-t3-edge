import type { Example } from "@prisma/client/edge";
import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { env } from "~/env.mjs";

interface Database {
    Example: Example;
}

export const db = new Kysely<Database>({
    dialect: new PlanetScaleDialect({
        host: "aws.connect.psdb.cloud",
        username: env.DATABASE_USERNAME,
        password: env.DATABASE_PASSWORD,
    }),
});
