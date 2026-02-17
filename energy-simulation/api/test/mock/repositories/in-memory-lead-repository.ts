import { Lead } from "@src/domain/entities/lead/lead";
import { ILeadRepository } from "@src/domain/repositories/lead-repository";

export class InMemoryLeadRepository implements ILeadRepository {
  leads: Lead[] = [];

  async save(entity: Lead): Promise<void> {
    this.leads.push(entity);
  }

  async findByEmail(email: string): Promise<Lead | null> {
    return this.leads.find((lead) => lead.email.compare(email)) || null;
  }

  async findAll(): Promise<Lead[]> {
    return this.leads;
  }

  async findById(id: string): Promise<Lead | null> {
    return this.leads.find((lead) => lead.id === id) || null;
  }

  async count(): Promise<number> {
    return this.leads.length;
  }

  async delete(id: string): Promise<void> {
    this.leads = this.leads.filter((lead) => lead.id !== id);
  }
}
