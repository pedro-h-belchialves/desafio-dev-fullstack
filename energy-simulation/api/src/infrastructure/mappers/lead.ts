import { Lead } from "@src/domain/entities/lead/lead";
import { TUnidadePersistence, UnidadeMapper } from "./unidate";
import { Email } from "@src/domain/entities/lead/value-objects/email";
import { Telefone } from "@src/domain/entities/lead/value-objects/telefone";

export type LeadPersistence = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  unidades: TUnidadePersistence[] | null;
  created_at: bigint;
  updated_at: bigint | null;
};

export class LeadMapper {
  static toDto(lead: LeadPersistence) {
    const email = new Email(lead.email);
    const telefone = new Telefone(lead.telefone);
    return Lead.create(
      {
        nome: lead.nome,
        email: email,
        telefone: telefone,
        unidades: lead.unidades
          ? lead.unidades.map((unidade: TUnidadePersistence) =>
              UnidadeMapper.toDomin(unidade),
            )
          : [],
      },
      lead.id,
    );
  }

  static toPersistence(lead: Lead) {
    return {
      id: lead.id,
      nome: lead.nome,
      email: lead.email.getValue(),
      telefone: lead.telefone.getValue(),
      unidades: lead.unidades.map((unidade) =>
        UnidadeMapper.toPersistence(unidade, lead.id),
      ),
      created_at: BigInt(Date.now()),
      updated_at: null,
    };
  }
}
