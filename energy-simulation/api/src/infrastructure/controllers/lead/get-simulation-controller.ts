import { GetSimulationUseCase } from "@src/application/use-cases/lead/get-simulation/get-simulation-use-case";
import { IControllerContract } from "../../contracts/controler-contract";
import { GetSimulationDTO } from "@src/application/use-cases/lead/get-simulation/get-simulation-dto";
import { ClientAlreadyExistsError } from "@src/application/use-cases/lead/get-simulation/errors/client-already-exists-error";
import { InvalidModelError } from "@src/application/use-cases/lead/get-simulation/errors/invalid-model-error";
import { InvalidFramingError } from "@src/application/use-cases/lead/get-simulation/errors/invalid-framing-error";
import { getSimulationSchema } from "@src/infrastructure/validators/get-simulation-schema";
import { IHttpRequest } from "../../contracts/http-request-contract";
import { formatValidationErrors } from "@src/infrastructure/utils/format-validation-errors";

export interface IGetSimulationInput {
  nome: string;
  email: string;
  telefone: string;
  contas: string;
}
export class GetSimulationController implements IControllerContract<GetSimulationDTO> {
  constructor(private getSimulationUseCase: GetSimulationUseCase) {}

  async handle(httpRequest: IHttpRequest<IGetSimulationInput>) {
    try {
      const validation = getSimulationSchema.safeParse({
        nome: httpRequest.body.nome,
        email: httpRequest.body.email,
        telefone: httpRequest.body.telefone,
        contas: httpRequest.body.contas,
      });

      if (!validation.success) {
        return {
          statusCode: 400,

          body: {
            message: formatValidationErrors(JSON.stringify(validation.error)),
          },
        };
      }

      const response = await this.getSimulationUseCase.execute(validation.data);
      return {
        statusCode: 200,
        body: response,
      };
    } catch (e) {
      console.error((e as Error).message);
      if (
        e instanceof InvalidModelError ||
        e instanceof InvalidFramingError ||
        e instanceof ClientAlreadyExistsError
      ) {
        return {
          statusCode: 400,
          body: { message: e.message },
        };
      } else {
        return {
          statusCode: 500,
          body: {
            message: (e as Error).message,
          },
        };
      }
    }
  }
}
