import {
  FindAllLeadsQuery,
  ILeadRepository,
} from "@src/domain/repositories/lead-repository";
import { FetchLeadsDto } from "./fetch-leads-dto";
import { Lead } from "@src/domain/entities/lead/lead";

export class FetchLeadsUseCase {
  constructor(private leadRepository: ILeadRepository) {}

  async execute(query?: FindAllLeadsQuery): Promise<FetchLeadsDto> {
    const leads = await this.leadRepository.findAll(query);
    const total = await this.leadRepository.count(query);

    return {
      leads: leads.map((lead) => this.mapLeadToDto(lead)),
      total,
    };
  }

  private mapLeadToDto(lead: Lead) {
    return {
      id: lead.id,
      nome: lead.nome,
      email: lead.email.getValue(),
      telefone: lead.telefone.getValue(),
    };
  }
}
