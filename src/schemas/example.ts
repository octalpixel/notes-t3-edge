import { z } from "zod";

export const createNoteInputSchema = z.object({
    text: z.string().min(1).max(255),
});
export type CreateNoteInput = z.infer<typeof createNoteInputSchema>;
