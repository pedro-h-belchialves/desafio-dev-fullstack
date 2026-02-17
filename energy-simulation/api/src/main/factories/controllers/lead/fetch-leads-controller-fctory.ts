import { FetchLeadsController } from "@src/infrastructure/controllers/lead/fetch-leads-controller";
import { makeFetchLeadsUseCase } from "../../use-cases/lead/fetch-leads-use-case-factory";

const makeFetchLeadsController = () => {
  const fetchLeadsUseCase = makeFetchLeadsUseCase();
  const fetchLeadsController = new FetchLeadsController(fetchLeadsUseCase);
  return fetchLeadsController;
};

export { makeFetchLeadsController };
