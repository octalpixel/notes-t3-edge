import { z } from "zod";

export const createExampleInput = z.object({
    text: z.string().min(1).max(255),
});
export type CreateExampleInput = z.infer<typeof createExampleInput>;
