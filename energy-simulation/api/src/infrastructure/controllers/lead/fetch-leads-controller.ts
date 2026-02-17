import { FetchLeadsUseCase } from "@src/application/use-cases/lead/fetch-leads/fetch-leads-use-case";
import { IControllerContract } from "../../contracts/controler-contract";
import { FetchLeadsDto } from "@src/application/use-cases/lead/fetch-leads/fetch-leads-dto";
import { fetchLeadsSchema } from "@src/infrastructure/validators/fetch-leads-schema";
import { IHttpRequest } from "../../contracts/http-request-contract";
import { formatValidationErrors } from "@src/infrastructure/utils/format-validation-errors";

export interface IFetchLeadsInput {
  page?: number;
  limit?: number;
  offset?: number;
  orderBy?: string;
  email?: string;
  name?: string;
  model?: string;
  phase?: string;
}
export class FetchLeadsController implements IControllerContract<FetchLeadsDto> {
  constructor(private fetchLeadsUseCase: FetchLeadsUseCase) {}

  async handle(httpRequest: IHttpRequest<unknown, unknown, IFetchLeadsInput>) {
    try {
      const validation = fetchLeadsSchema.safeParse({
        limit: httpRequest.query.limit
          ? Number(httpRequest.query.limit)
          : undefined,
        offset: httpRequest.query.offset
          ? Number(httpRequest.query.offset)
          : undefined,
        orderBy: httpRequest.query.orderBy,
        email: httpRequest.query.email,
        name: httpRequest.query.name,
        model: httpRequest.query.model,
        phase: httpRequest.query.phase,
      });

      if (!validation.success) {
        return {
          statusCode: 400,
          body: {
            message: formatValidationErrors(JSON.stringify(validation.error)),
          },
        };
      }

      const response = await this.fetchLeadsUseCase.execute(validation.data);
      return {
        statusCode: 200,
        body: response,
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: {
          message: (err as Error).message,
        },
      };
    }
  }
}
