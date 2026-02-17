import { Consumo } from "@src/domain/entities/lead/consumo";

export type TConsumoPersistence = {
  id: string;
  mes: bigint;
  valorKwh: number;
  unidade_id: string;
  created_at: bigint;
  updated_at: bigint | null;
};

export class ConsumoMapper {
  public static toDomain(consumo: TConsumoPersistence): Consumo {
    return Consumo.create({
      mesDoConsumo: new Date(Number(consumo.mes)),
      consumoForaPontaEmKWH: consumo.valorKwh,
    });
  }

  public static toPersistence(
    consumo: Consumo,
    unidadeId: string,
  ): TConsumoPersistence {
    const now = BigInt(Date.now());

    return {
      id: crypto.randomUUID(),
      mes: BigInt(new Date(consumo.mes).getTime()),
      valorKwh: consumo.valor,
      unidade_id: unidadeId,
      created_at: now,
      updated_at: null,
    };
  }
}
