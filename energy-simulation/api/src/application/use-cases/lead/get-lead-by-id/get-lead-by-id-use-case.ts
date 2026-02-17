import { ILeadRepository } from "@src/domain/repositories/lead-repository";
import { GetLeadByIdInput } from "./get-lead-by-id-input";
import { GetLeadByIdDto } from "./get-lead-by-id-dto";
import { Lead } from "@src/domain/entities/lead/lead";
import { Unidade } from "@src/domain/entities/lead/unidade";
import { Consumo } from "@src/domain/entities/lead/consumo";
import { LeadNotFoundError } from "./errors/lead-not-found-error";

export class GetLeadByIdUseCase {
  constructor(private leadRepository: ILeadRepository) {}

  async execute(props: GetLeadByIdInput): Promise<GetLeadByIdDto> {
    const lead = await this.leadRepository.findById(props.id);

    if (!lead) {
      throw new LeadNotFoundError();
    }

    return this.mapLeadToDto(lead);
  }

  private mapLeadToDto(lead: Lead) {
    return {
      id: lead.id,
      nome: lead.nome,
      email: lead.email.getValue(),
      telefone: lead.telefone.getValue(),
      unidades: lead.unidades.map((unidade: Unidade) => ({
        codigo: unidade.codigo,
        modelo: unidade.modelo,
        enquadramento: unidade.enquadramento,
        consumos: unidade.consumos.map((consumo: Consumo) => ({
          mes: consumo.mes,
          valor: consumo.valor,
        })),
      })),
    };
  }
}
