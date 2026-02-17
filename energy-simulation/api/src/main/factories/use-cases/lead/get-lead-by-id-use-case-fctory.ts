import { GetLeadByIdUseCase } from "@src/application/use-cases/lead/get-lead-by-id/get-lead-by-id-use-case";
import { PrismaLeadRepository } from "@src/infrastructure/databases/prisma/repositories/prisma-lead-repository";

const makeGetLeadByIdUseCase = () => {
  const leadRepository = new PrismaLeadRepository();
  return new GetLeadByIdUseCase(leadRepository);
};

export { makeGetLeadByIdUseCase };
