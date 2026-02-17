import { FetchLeadsUseCase } from "@src/application/use-cases/lead/fetch-leads/fetch-leads-use-case";
import { PrismaLeadRepository } from "@src/infrastructure/databases/prisma/repositories/prisma-lead-repository";

const makeFetchLeadsUseCase = () => {
  const prismaLeadRepository = new PrismaLeadRepository();
  const fetchLeadsUseCase = new FetchLeadsUseCase(prismaLeadRepository);
  return fetchLeadsUseCase;
};

export { makeFetchLeadsUseCase };
