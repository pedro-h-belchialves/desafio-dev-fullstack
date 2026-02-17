import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import fastifyMultipart from "@fastify/multipart";

async function staticPlugin(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 5000 * 1024 * 1024,
    },
  });
}

export const fastifyMultipartPlugin = fp(staticPlugin);
