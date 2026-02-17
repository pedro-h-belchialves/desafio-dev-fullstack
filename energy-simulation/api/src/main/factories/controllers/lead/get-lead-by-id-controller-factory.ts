import { GetLeadByIdController } from "@src/infrastructure/controllers/lead/get-lead-by-id-controller";
import { makeGetLeadByIdUseCase } from "../../use-cases/lead/get-lead-by-id-use-case-fctory";

const makeGetLeadByIdController = () => {
  const getLeadByIdUseCase = makeGetLeadByIdUseCase();
  return new GetLeadByIdController(getLeadByIdUseCase);
};

export { makeGetLeadByIdController };
