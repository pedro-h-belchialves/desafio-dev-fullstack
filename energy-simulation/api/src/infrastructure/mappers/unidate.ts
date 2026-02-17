import { Unidade } from "@src/domain/entities/lead/unidade";
import { ConsumoMapper, TConsumoPersistence } from "./consumo";

export type TUnidadePersistence = {
  id: string;
  codigo: string;
  modelo: string;
  fase: string;
  lead_id: string;
  consumos: TConsumoPersistence[];
  created_at: bigint;
  updated_at: bigint | null;
};

export class UnidadeMapper {
  static toPersistence(unidade: Unidade, leadId: string): TUnidadePersistence {
    return {
      id: unidade.id,
      codigo: unidade.codigo,
      modelo: unidade.modelo,
      fase: unidade.enquadramento,
      lead_id: leadId,
      consumos: unidade.consumos.map((consumo) =>
        ConsumoMapper.toPersistence(consumo, unidade.id),
      ),
      created_at: BigInt(Date.now()),
      updated_at: null,
    };
  }

  static toDomin(unidade: TUnidadePersistence): Unidade {
    return Unidade.create({
      codigoDaUnidadeConsumidora: unidade.codigo,
      modeloFasico: unidade.modelo as any,
      enquadramento: unidade.fase as any,
      historicoDeConsumoEmKWH: unidade.consumos.map((consumo) =>
        ConsumoMapper.toDomain(consumo),
      ),
    });
  }
}
