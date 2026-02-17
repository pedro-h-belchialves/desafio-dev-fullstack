import { describe, beforeEach, it, expect } from "vitest";

import { Lead } from "@src/domain/entities/lead/lead";
import { Email } from "@src/domain/entities/lead/value-objects/email";
import { Telefone } from "@src/domain/entities/lead/value-objects/telefone";
import { makeUnidade } from "@test/mock/domain/unidade";

describe("Lead", () => {
  it("should not create an invalid lead", () => {
    let error: Error | null = null;

    const email = new Email("email@test.com");
    const telefone = new Telefone("11987654321");
    try {
      Lead.create({
        unidades: [],
        email: email,
        telefone: telefone,
        nome: "",
      });
    } catch (e) {
      error = e as Error;
    }
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe("lead deve ter ao menos uma unidade");
  });

  it("should create a valid lead", () => {
    const email = new Email("email@test.com");
    const telefone = new Telefone("11987654321");

    const unidade = makeUnidade();
    const lead = Lead.create({
      unidades: [unidade],
      email: email,
      telefone: telefone,
      nome: "John Doe",
    });

    expect(lead).toBeInstanceOf(Lead);
  });

  it("should create a lead with multiple units", () => {
    const email = new Email("email@test.com");
    const telefone = new Telefone("11987654321");

    const unidade1 = makeUnidade();
    const unidade2 = makeUnidade();
    const lead = Lead.create({
      unidades: [unidade1, unidade2],
      email: email,
      telefone: telefone,
      nome: "John Doe",
    });

    expect(lead).toBeInstanceOf(Lead);

    expect(lead.unidades).toHaveLength(2);
    expect(lead.unidades).toContain(unidade1);
    expect(lead.unidades).toContain(unidade2);
  });
});
