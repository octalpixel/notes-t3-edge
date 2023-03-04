import { z } from "zod";
import { nanoid } from "nanoid";
import { createNoteInputSchema } from "~/schemas/example";
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs/server";

export const notesRouter = createTRPCRouter({
    create: protectedProcedure
        .input(createNoteInputSchema)
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx.session;

            const user = await clerkClient.users.getUser(userId);

            return await ctx.db
                .insertInto("Note")
                .values({
                    id: nanoid(),
                    text: input.text,
                    authorId: userId,
                    authorName: user.firstName ?? "Anonymous",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
                .execute();
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                text: z.string().min(1).max(255),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return await ctx.db
                .updateTable("Note")
                .set({
                    text: input.text,
                    updatedAt: new Date(),
                })
                .where("Note.id", "=", input.id)
                .execute();
        }),

    list: publicProcedure.query(async ({ ctx }) => {
        return await ctx.db.selectFrom("Note").selectAll().execute();
    }),
});
