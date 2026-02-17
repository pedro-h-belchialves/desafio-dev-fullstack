import { describe, it, expect } from "vitest";

import { Telefone } from "@src/domain/entities/lead/value-objects/telefone";

describe("Telefone", () => {
  it("should not create an invalid telefone", () => {
    let error: Error | null = null;
    try {
      new Telefone("119876543211");
    } catch (e) {
      error = e as Error;
    }
    expect(error).toBeInstanceOf(Error);
  });

  it("should create a valid telefone", () => {
    const telefone = new Telefone("11987654321");

    expect(telefone.format()).toBe("(11) 98765-4321");
  });

  it("should compare telefones with the same value", () => {
    const telefone1 = new Telefone("11987654321");
    const telefone2 = new Telefone("11987654321");

    expect(telefone1.equals(telefone2)).toBe(true);
  });

  it("should compare telefones with different values", () => {
    const telefone1 = new Telefone("11987654321");
    const telefone2 = new Telefone("11987654322");

    expect(telefone1.equals(telefone2)).toBe(false);
  });
});
