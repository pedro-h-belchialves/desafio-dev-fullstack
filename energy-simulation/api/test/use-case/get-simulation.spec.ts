import { describe, beforeEach, it, expect, vi } from "vitest";

import { PFaturaDecoder } from "@src/application/ports/fatura-decoder-port";
import { GetSimulationUseCase } from "@src/application/use-cases/lead/get-simulation/get-simulation-use-case";
import { ILeadRepository } from "@src/domain/repositories/lead-repository";
import { FakeFaturaDecoder } from "@test/mock/ports/fatura-decoder";
import { InMemoryLeadRepository } from "@test/mock/repositories/in-memory-lead-repository";

describe("GetSimulation", () => {
  let faturaDecoder: PFaturaDecoder;
  let leadRepository: ILeadRepository;
  let sut: GetSimulationUseCase;

  beforeEach(() => {
    faturaDecoder = new FakeFaturaDecoder();
    leadRepository = new InMemoryLeadRepository();
    sut = new GetSimulationUseCase(leadRepository, faturaDecoder);
  });

  it("should not allow duplicate email", async () => {
    await sut.execute({
      email: "email@test.com",
      telefone: "11987654321",
      nome: "John Doe",
      contas: [Buffer.from("fake")],
    });

    await expect(
      sut.execute({
        email: "email@test.com",
        telefone: "11987654321",
        nome: "Another",
        contas: [Buffer.from("fake")],
      }),
    ).rejects.toThrow("Cliente já cadastrado");
  });

  it("should fail if no units are provided", async () => {
    await expect(
      sut.execute({
        email: "email@test.com",
        telefone: "11987654321",
        nome: "John Doe",
        contas: [],
      }),
    ).rejects.toThrow("lead deve ter ao menos uma unidade");
  });

  it("should fail if unit does not have 12 months of consumption", async () => {
    vi.spyOn(faturaDecoder, "decode").mockResolvedValue({
      codigo: "123",
      modelo: "monofasico",
      fase: "AX",
      historico_consumo: [],
    });

    await expect(
      sut.execute({
        email: "email@test.com",
        telefone: "11987654321",
        nome: "John Doe",
        contas: [Buffer.from("fake")],
      }),
    ).rejects.toThrow("unidade deve ter 12 meses de consumo");
  });

  it("should propagate decoder error", async () => {
    vi.spyOn(faturaDecoder, "decode").mockRejectedValue(
      new Error("Erro ao decodificar"),
    );

    await expect(
      sut.execute({
        email: "email@test.com",
        telefone: "11987654321",
        nome: "John Doe",
        contas: [Buffer.from("fake")],
      }),
    ).rejects.toThrow("Erro ao decodificar");
  });

  it("should fail if email is not invalid", async () => {
    await expect(
      sut.execute({
        email: "email-invalido",
        telefone: "11987654321",
        nome: "John Doe",
        contas: [Buffer.from("fake")],
      }),
    ).rejects.toThrow();
  });

  it("should fail if phone is invalid", async () => {
    await expect(
      sut.execute({
        email: "email@test.com",
        telefone: "abc",
        nome: "John Doe",
        contas: [Buffer.from("fake")],
      }),
    ).rejects.toThrow();
  });

  it("should create a lead successfully", async () => {
    await sut.execute({
      email: "email@test.com",
      telefone: "11987654321",
      nome: "John Doe",
      contas: [Buffer.from("fake")],
    });

    const savedLead = await leadRepository.findByEmail("email@test.com");

    expect(savedLead).toBeDefined();
    expect(savedLead?.email.compare("email@test.com")).toBeTruthy();
  });

  it("should return a lead id", async () => {
    const result = await sut.execute({
      email: "email@test.com",
      telefone: "11987654321",
      nome: "John Doe",
      contas: [Buffer.from("fake")],
    });

    expect(result).toBeDefined();
  });
});
