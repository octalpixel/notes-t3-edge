import { z } from "zod";
import { nanoid } from "nanoid";
import { createExampleInput } from "~/schemas/example";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
    find: publicProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            return await ctx.db
                .selectFrom("Example")
                .where("Example.id", "=", input.id)
                .executeTakeFirst();
        }),

    create: publicProcedure
        .input(createExampleInput)
        .mutation(async ({ ctx, input }) => {
            const id = nanoid();
            const timeStart = new Date();
            await ctx.db
                .insertInto("Example")
                .values({
                    id,
                    text: input.text,
                    createdAt: timeStart,
                    updatedAt: timeStart,
                })
                .execute();
            const timeEnd = new Date();
            return {
                id,
                time: timeEnd.getTime() - timeStart.getTime(),
            };
        }),

    update: publicProcedure
        .input(
            z.object({
                id: z.string(),
                text: z.string().min(1).max(255),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return await ctx.db
                .updateTable("Example")
                .set({
                    text: input.text,
                    updatedAt: new Date(),
                })
                .where("Example.id", "=", input.id)
                .execute();
        }),

    list: publicProcedure.query(async ({ ctx }) => {
        const timeStart = Date.now();
        const list = await ctx.db.selectFrom("Example").selectAll().execute();
        const timeEnd = Date.now();

        return {
            list,
            time: timeEnd - timeStart,
        };
    }),

    protected: protectedProcedure.query(({ ctx }) => {
        return {
            userId: ctx.session.userId,
        };
    }),
});
