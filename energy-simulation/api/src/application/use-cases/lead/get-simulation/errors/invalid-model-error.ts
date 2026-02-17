import { GetSimulationError } from "../get-simulation-error";

export class InvalidModelError extends GetSimulationError {
  constructor() {
    super("Modelo inválido");
    this.name = "InvalidModelError";
  }
}
