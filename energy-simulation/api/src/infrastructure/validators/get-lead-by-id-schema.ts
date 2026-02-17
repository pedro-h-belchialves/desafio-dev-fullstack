import z from "zod";

export const getLeadByIdSchema = z.object({
  id: z.uuid(),
});

export type GetLeadByIdSchema = z.infer<typeof getLeadByIdSchema>;
