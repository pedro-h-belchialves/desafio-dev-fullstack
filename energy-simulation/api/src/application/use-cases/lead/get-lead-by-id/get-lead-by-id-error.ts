export class GetLeadByIdError extends Error {
  constructor(message: string) {
    super("Erro ao buscar lead: " + message);
    this.name = "GetLeadByIdError";
  }
}
