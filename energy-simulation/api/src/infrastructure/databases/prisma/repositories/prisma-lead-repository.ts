import { Lead } from "@src/domain/entities/lead/lead";
import {
  FindAllLeadsQuery,
  ILeadRepository,
} from "@src/domain/repositories/lead-repository";
import { prisma } from "../prisma";
import { LeadMapper } from "@src/infrastructure/mappers/lead";
import { Unidade } from "@src/domain/entities/lead/unidade";
import { UnidadeMapper } from "@src/infrastructure/mappers/unidate";
import { Consumo } from "@src/domain/entities/lead/consumo";
import { ConsumoMapper } from "@src/infrastructure/mappers/consumo";

export class PrismaLeadRepository implements ILeadRepository {
  async save(entity: Lead): Promise<void> {
    try {
      const leadPersistance = LeadMapper.toPersistence(entity);
      await prisma.lead.create({
        data: { ...leadPersistance, unidades: undefined },
      });

      for (const unidade of entity.unidades) {
        await this.createUnidade(unidade, leadPersistance.id);
      }
    } catch (e) {
      throw new Error("Erro ao criar lead");
    }
  }

  async findById(id: string): Promise<Lead | null> {
    try {
      const lead = await prisma.lead.findUnique({
        where: { id },
        include: {
          unidades: {
            include: {
              consumos: true,
            },
          },
        },
      });

      if (!lead) {
        return null;
      }

      return LeadMapper.toDto(lead);
    } catch (e) {
      throw new Error("Erro ao buscar lead");
    }
  }

  async findByEmail(email: string): Promise<Lead | null> {
    try {
      const lead = await prisma.lead.findUnique({
        where: { email },
        include: {
          unidades: {
            include: {
              consumos: true,
            },
          },
        },
      });

      if (!lead) {
        return null;
      }

      return LeadMapper.toDto(lead);
    } catch (e) {
      throw new Error("Erro ao buscar lead");
    }
  }

  async findAll(query?: FindAllLeadsQuery): Promise<Lead[]> {
    try {
      const where: any = {};

      if (query) {
        if (query.email) {
          where.email = query.email;
        }
        if (query.name) {
          where.id = query.name;
        }

        if (query.model) {
          where.unidades = {
            some: {
              modelo: query?.model,
            },
          };
        }

        if (query.phase) {
          where.unidades = {
            some: {
              fase: query?.phase,
            },
          };
        }
      }

      const skip = (Number(query?.offset) || 0) * Number(query?.limit || 0);
      const take = query?.limit ? Number(query.limit) : undefined;

      const orderByMap = {
        date_asc: { created_at: "asc" },
        date_desc: { created_at: "desc" },
      } as const;

      const orderBy =
        query?.orderBy && orderByMap[query?.orderBy]
          ? orderByMap[query?.orderBy]
          : { created_at: "desc" };

      const leads = await prisma.lead.findMany({
        where,
        include: {
          unidades: {
            include: {
              consumos: true,
            },
          },
        },
        orderBy,
        skip,
        take,
      });

      const leadsMapped = leads.map((lead) => LeadMapper.toDto(lead));
      return leadsMapped;
    } catch (e) {
      throw new Error("Erro ao buscar leads");
    }
  }

  async count(query?: FindAllLeadsQuery): Promise<number> {
    try {
      const where: any = {};

      if (query) {
        if (query.email) {
          where.email = query.email;
        }
        if (query.name) {
          where.id = query.name;
        }

        if (query.model) {
          where.unidades = {
            some: {
              modelo: query?.model,
            },
          };
        }

        if (query.phase) {
          where.unidades = {
            some: {
              fase: query?.phase,
            },
          };
        }
      }
      const leads = await prisma.lead.count({
        where,
      });
      return leads;
    } catch (e) {
      throw new Error("Erro ao buscar leads");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.lead.delete({ where: { id } });
    } catch (e) {
      throw new Error("Erro ao deletar lead");
    }
  }

  private async createUnidade(unidade: Unidade, leadId: string): Promise<void> {
    try {
      const unidadePersistence = UnidadeMapper.toPersistence(unidade, leadId);
      await prisma.unidade.create({
        data: { ...unidadePersistence, consumos: undefined },
      });

      for (const consumo of unidade.consumos) {
        await this.createConsumo(consumo, unidadePersistence.id);
      }
    } catch (e) {
      throw new Error("Erro ao criar unidade");
    }
  }

  private async createConsumo(consumo: Consumo, unidadeId: string) {
    try {
      await prisma.consumo.create({
        data: ConsumoMapper.toPersistence(consumo, unidadeId),
      });
    } catch (e) {
      throw new Error("Erro ao criar consumo");
    }
  }
}
