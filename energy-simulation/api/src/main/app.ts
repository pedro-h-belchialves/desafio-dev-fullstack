import { fastify } from "fastify";
import leadRoutes from "./routes/lead";
import { fastifyMultipartPlugin } from "./plugin/fastify-multpart";
// import { fastifyCorsPlugin } from "./plugin/fastify-cors";

const app = fastify({
  logger: false,
});

// app.register(fastifyCorsPlugin);
app.register(fastifyMultipartPlugin);

app.register(leadRoutes, {
  prefix: "/leads",
});
export default app;
