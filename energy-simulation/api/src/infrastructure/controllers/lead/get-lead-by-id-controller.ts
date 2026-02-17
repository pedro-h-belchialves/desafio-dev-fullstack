import { LeadNotFoundError } from "@src/application/use-cases/lead/get-lead-by-id/errors/lead-not-found-error";
import { GetLeadByIdUseCase } from "@src/application/use-cases/lead/get-lead-by-id/get-lead-by-id-use-case";
import { getLeadByIdSchema } from "@src/infrastructure/validators/get-lead-by-id-schema";
import { IHttpRequest } from "../../contracts/http-request-contract";
import { IControllerContract } from "@src/infrastructure/contracts/controler-contract";
import { formatValidationErrors } from "@src/infrastructure/utils/format-validation-errors";

export interface IGetLeadByIdInput {
  id: string;
}
export class GetLeadByIdController implements IControllerContract<IGetLeadByIdInput> {
  constructor(private getLeadByIdUseCase: GetLeadByIdUseCase) {}

  async handle(httpRequest: IHttpRequest<unknown, IGetLeadByIdInput>) {
    try {
      const validation = getLeadByIdSchema.safeParse({
        id: httpRequest.params.id,
      });

      if (!validation.success) {
        return {
          statusCode: 400,
          body: {
            message: formatValidationErrors(JSON.stringify(validation.error)),
          },
        };
      }

      const response = await this.getLeadByIdUseCase.execute(validation.data);
      return {
        statusCode: 200,
        body: response,
      };
    } catch (err) {
      console.error((err as Error).message);
      if (err instanceof LeadNotFoundError) {
        return {
          statusCode: 404,
          body: { message: err.message },
        };
      }
      return {
        statusCode: 500,
        body: {
          message: (err as Error).message,
        },
      };
    }
  }
}
