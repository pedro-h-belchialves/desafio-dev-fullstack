import { GetSimulationController } from "@src/infrastructure/controllers/lead/get-simulation-controller";
import { makeGetSimulationUseCase } from "../../use-cases/lead/get-simulation-use-case-factory";

const makeGetSimulationController = () => {
  const getSimulationUseCase = makeGetSimulationUseCase();
  return new GetSimulationController(getSimulationUseCase);
};

export { makeGetSimulationController };
