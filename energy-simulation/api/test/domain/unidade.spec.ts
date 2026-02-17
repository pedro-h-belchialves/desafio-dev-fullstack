import { describe, beforeEach, it, expect } from "vitest";

import { Unidade } from "@src/domain/entities/lead/unidade";
import { Consumo } from "@src/domain/entities/lead/consumo";

describe("Unidade", () => {
  it("should not create an invalid unit", () => {
    let error: Error | null = null;
    try {
      Unidade.create({
        codigoDaUnidadeConsumidora: "",
        modeloFasico: "monofasico",
        enquadramento: "AX",
        historicoDeConsumoEmKWH: [],
      });
    } catch (e) {
      error = e as Error;
    }
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe(
      "unidade deve ter 12 meses de consumo",
    );
  });

  it("should create a valid unit", () => {
    const consummption: Consumo[] = [];

    for (let i = 0; i < 12; i++) {
      consummption.push(
        Consumo.create({
          consumoForaPontaEmKWH: 100,
          mesDoConsumo: new Date(new Date().setMonth(i)),
        }),
      );
    }
    const unit = Unidade.create({
      codigoDaUnidadeConsumidora: "123",
      modeloFasico: "monofasico",
      enquadramento: "AX",
      historicoDeConsumoEmKWH: consummption,
    });

    expect(unit.id).toBeDefined();
    expect(unit.codigo).toBe("123");
    expect(unit.modelo).toBe("monofasico");
    expect(unit.enquadramento).toBe("AX");
    expect(unit.consumos.length).toBe(12);
  });
});
