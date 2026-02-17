import { Lead } from "../entities/lead/lead";
import { IRepository } from "../shared/repository";

export interface FindAllLeadsQuery {
  email?: string;
  name?: string;
  model?: string;
  phase?: string;
  limit?: number;
  offset?: number;
  orderBy?: string;
}
export interface ILeadRepository extends IRepository<Lead> {
  findAll(query?: FindAllLeadsQuery): Promise<Lead[]>;
  findByEmail(email: string): Promise<Lead | null>;
  count(query?: FindAllLeadsQuery): Promise<number>;
}
