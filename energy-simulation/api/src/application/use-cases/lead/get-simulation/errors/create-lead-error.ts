export class CreateLeadError extends Error {
  constructor() {
    super("Erro ao criar lead");
    this.name = "CreateLeadError";
  }
}
