import { GetSimulationUseCase } from "@src/application/use-cases/lead/get-simulation/get-simulation-use-case";
import { PrismaLeadRepository } from "@src/infrastructure/databases/prisma/repositories/prisma-lead-repository";
import { AxiosHttpClient } from "@src/infrastructure/http/axios-http-client";
import { MagicPdfFaturaDecoder } from "@src/infrastructure/services/MagicPdfFaturaDecoder";

const makeGetSimulationUseCase = () => {
  const leadRepository = new PrismaLeadRepository();
  const httpClient = new AxiosHttpClient();
  const faturaDecoder = new MagicPdfFaturaDecoder(httpClient);
  const getSimulationUseCase = new GetSimulationUseCase(
    leadRepository,
    faturaDecoder,
  );
  return getSimulationUseCase;
};

export { makeGetSimulationUseCase };
