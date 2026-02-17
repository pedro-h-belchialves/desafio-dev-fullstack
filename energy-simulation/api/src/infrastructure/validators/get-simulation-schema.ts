import z from "zod";

export const getSimulationSchema = z.object({
  nome: z.string(),
  email: z.email(),
  telefone: z.string(),
  contas: z.instanceof(Buffer).array(),
});

export type GetSimulationValidatedInput = z.infer<typeof getSimulationSchema>;
