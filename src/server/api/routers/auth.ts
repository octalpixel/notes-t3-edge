import { createTRPCRouter, protectedProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
    secretMessage: protectedProcedure.query(() => {
        return `This is a Secret Message`;
    }),
});
