export class InvalidFramingError extends Error {
  constructor() {
    super("Enquadramento inválido");
    this.name = "InvalidFramingError";
  }
}
