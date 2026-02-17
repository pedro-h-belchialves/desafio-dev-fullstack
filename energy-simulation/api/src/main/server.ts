import "dotenv/config";
import app from "./app";

app
  .listen({
    port: Number(process.env.PORT) || 4000,
    host: "0.0.0.0",
  })
  .then((address) => {
    console.log(`✅ Server listening at ${address}`);
  })
  .catch((err) => {
    console.error(`❌ Server failed to start: ${err}`);
    process.exit(1);
  });
