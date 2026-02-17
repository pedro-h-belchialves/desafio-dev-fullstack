import z from "zod";

export const fetchLeadsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
  orderBy: z.string().optional(),
  email: z.string().optional(),
  name: z.string().optional(),
  model: z.string().optional(),
  phase: z.string().optional(),
});

export type FetchLeadsSchema = z.infer<typeof fetchLeadsSchema>;
