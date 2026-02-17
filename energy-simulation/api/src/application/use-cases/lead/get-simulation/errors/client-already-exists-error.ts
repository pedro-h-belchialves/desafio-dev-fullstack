export class ClientAlreadyExistsError extends Error {
  constructor() {
    super("Cliente já cadastrado ");
    this.name = "ClientAlreadyExistsError";
  }
}
