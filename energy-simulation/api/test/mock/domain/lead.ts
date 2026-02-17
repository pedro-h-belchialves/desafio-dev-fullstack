import { ILeadProps, Lead } from "@src/domain/entities/lead/lead";
import { Email } from "@src/domain/entities/lead/value-objects/email";
import { Telefone } from "@src/domain/entities/lead/value-objects/telefone";
import { makeUnidade } from "./unidade";

export const makeLead = (override: Partial<ILeadProps> & { id?: string }) => {
  return Lead.create(
    {
      email: new Email("email@test.com"),
      telefone: new Telefone("11987654321"),
      unidades: [makeUnidade()],
      nome: "John Doe",
      ...override,
    },
    override.id,
  );
};
