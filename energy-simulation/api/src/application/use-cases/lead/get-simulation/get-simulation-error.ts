export class GetSimulationError extends Error {
  constructor(message: string) {
    super("Falha ao criar simulação: " + message);
    this.name = "GetSimulationError";
  }
}
