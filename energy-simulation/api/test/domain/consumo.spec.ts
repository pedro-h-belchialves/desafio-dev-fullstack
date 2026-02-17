import { describe, it, expect } from "vitest";

import { Consumo } from "@src/domain/entities/lead/consumo";

describe("Consumo", () => {
  it("should not create an invalid consumption", () => {
    let error: Error | null = null;
    try {
      Consumo.create({
        consumoForaPontaEmKWH: -1,
        mesDoConsumo: new Date(),
      });
    } catch (e) {
      error = e as Error;
    }
    expect(error).toBeInstanceOf(Error);
  });

  it("should create a valid consumption", () => {
    const consumption = Consumo.create({
      consumoForaPontaEmKWH: 100,
      mesDoConsumo: new Date(),
    });

    expect(consumption.valor).toBe(100);
    expect(consumption.mes).toBeInstanceOf(Date);
  });
});
