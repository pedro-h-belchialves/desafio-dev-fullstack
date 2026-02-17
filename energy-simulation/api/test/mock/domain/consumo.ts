import { Consumo, IConsumoProps } from "@src/domain/entities/lead/consumo";

export const makeConsumo = (override: Partial<IConsumoProps>) => {
  return Consumo.create({
    consumoForaPontaEmKWH: 100,
    mesDoConsumo: new Date(),
    ...override,
  });
};
