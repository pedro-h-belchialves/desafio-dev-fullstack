import { FastifyInstance, FastifyRequest } from "fastify";
import { makeGetSimulationController } from "../factories/controllers/lead/get-simulation-controller-fctory";
import { IGetSimulationInput } from "@src/infrastructure/controllers/lead/get-simulation-controller";
import { multipartToBufferMiddleware } from "../middleware/upload-file-plugin";
import { makeGetLeadByIdController } from "../factories/controllers/lead/get-lead-by-id-controller-factory";
import { IGetLeadByIdInput } from "@src/infrastructure/controllers/lead/get-lead-by-id-controller";
import { makeFetchLeadsController } from "../factories/controllers/lead/fetch-leads-controller-fctory";
import { IFetchLeadsInput } from "@src/infrastructure/controllers/lead/fetch-leads-controller";

export const leadRoutes = (fastify: FastifyInstance) => {
  fastify.post(
    "/simulation",
    {
      preHandler: multipartToBufferMiddleware<IGetSimulationInput>,
    },
    async (request: FastifyRequest<{ Body: IGetSimulationInput }>, reply) => {
      const controller = makeGetSimulationController();

      const response = await controller.handle(request);
      return reply.status(response.statusCode).send(response.body);
    },
  );

  fastify.get(
    "/:id",
    async (request: FastifyRequest<{ Params: IGetLeadByIdInput }>, reply) => {
      const controller = makeGetLeadByIdController();

      const response = await controller.handle(request);
      return reply.status(response.statusCode).send(response.body);
    },
  );

  fastify.get(
    "/",
    async (
      request: FastifyRequest<{ Querystring: IFetchLeadsInput }>,
      reply,
    ) => {
      const controller = makeFetchLeadsController();

      const response = await controller.handle(request);
      return reply.status(response.statusCode).send(response.body);
    },
  );
};

export default leadRoutes;
