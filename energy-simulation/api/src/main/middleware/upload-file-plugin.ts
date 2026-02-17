import { FastifyRequest, FastifyReply } from "fastify";

export async function multipartToBufferMiddleware<T>(
  request: FastifyRequest<{ Body: T }>,
  reply: FastifyReply,
) {
  if (!request.isMultipart()) {
    return reply.status(400).send({
      error: "multipart required",
    });
  }

  const fields: Record<string, any> = {};
  const contas: Buffer[] = [];

  for await (const part of request.parts()) {
    if (part.type === "file" && part.fieldname === "file") {
      const buffer = await part.toBuffer();
      contas.push(buffer);
    } else if (part.type === "field") {
      fields[part.fieldname] = part.value;
    }
  }

  request.body = {
    ...fields,
    contas,
  } as T;
}
