import { describe, beforeEach, it, expect } from "vitest";

import { GetLeadByIdError } from "@src/application/use-cases/lead/get-lead-by-id/get-lead-by-id-error";
import { GetLeadByIdUseCase } from "@src/application/use-cases/lead/get-lead-by-id/get-lead-by-id-use-case";
import { ILeadRepository } from "@src/domain/repositories/lead-repository";
import { makeLead } from "@test/mock/domain/lead";
import { InMemoryLeadRepository } from "@test/mock/repositories/in-memory-lead-repository";
import { LeadNotFoundError } from "@src/application/use-cases/lead/get-lead-by-id/errors/lead-not-found-error";

describe("GetLeadByIdUseCase", () => {
  let leadRepository: ILeadRepository;
  let sut: GetLeadByIdUseCase;

  beforeEach(() => {
    leadRepository = new InMemoryLeadRepository();
    sut = new GetLeadByIdUseCase(leadRepository);
  });

  beforeEach(async () => {
    await leadRepository.save(
      makeLead({
        id: "lead-id",
      }),
    );
  });

  it("should fail if lead does not exist ", async () => {
    await expect(
      sut.execute({
        id: "lead-id-not-found",
      }),
    ).rejects.toThrow(new LeadNotFoundError());
  });

  it("should return lead", async () => {
    const leads = await sut.execute({
      id: "lead-id",
    });

    expect(leads).toBeDefined();
  });
});
