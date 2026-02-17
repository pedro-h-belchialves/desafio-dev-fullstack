import { describe, beforeEach, it, expect } from "vitest";

import { FetchLeadsUseCase } from "@src/application/use-cases/lead/fetch-leads/fetch-leads-use-case";
import { ILeadRepository } from "@src/domain/repositories/lead-repository";
import { makeLead } from "@test/mock/domain/lead";
import { InMemoryLeadRepository } from "@test/mock/repositories/in-memory-lead-repository";

describe("FetchLeadsUseCase", () => {
  let leadRepository: ILeadRepository;
  let sut: FetchLeadsUseCase;

  beforeEach(() => {
    leadRepository = new InMemoryLeadRepository();
    sut = new FetchLeadsUseCase(leadRepository);
  });

  beforeEach(async () => {
    const leads = [makeLead({}), makeLead({}), makeLead({})];

    await Promise.all(leads.map((lead) => leadRepository.save(lead)));
  });

  it("should fetch leads", async () => {
    const leads = await sut.execute();

    expect(leads.leads.length).toBe(3);
  });

  it("should return leads count", async () => {
    const leads = await sut.execute();

    expect(leads.total).toBe(3);
  });
});
