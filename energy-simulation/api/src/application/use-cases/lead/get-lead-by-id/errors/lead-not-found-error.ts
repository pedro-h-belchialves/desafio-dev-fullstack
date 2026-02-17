import { GetLeadByIdError } from "../get-lead-by-id-error";

export class LeadNotFoundError extends GetLeadByIdError {
  constructor() {
    super("Lead não encontrado");
    this.name = "LeadNotFoundError";
  }
}
