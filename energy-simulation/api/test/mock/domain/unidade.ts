import { Consumo } from "@src/domain/entities/lead/consumo";
import { IUnidadeProps, Unidade } from "@src/domain/entities/lead/unidade";
import { makeConsumo } from "./consumo";

export const makeUnidade = (override?: Partial<IUnidadeProps>) => {
  const consumos: Consumo[] = [];
  for (let i = 0; i < 12; i++) {
    consumos.push(
      makeConsumo({
        consumoForaPontaEmKWH: 100,
        mesDoConsumo: new Date(new Date().setMonth(i)),
      }),
    );
  }
  return Unidade.create({
    codigoDaUnidadeConsumidora: "123456",
    modeloFasico: "monofasico",
    enquadramento: "AX",
    historicoDeConsumoEmKWH: consumos,
    ...override,
  });
};
