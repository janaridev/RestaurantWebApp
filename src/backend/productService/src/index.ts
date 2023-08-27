import { config } from "dotenv";
config();

import buildServer from "./server";

const server = buildServer();
const PORT = process.env.PORT;

async function main() {
  try {
    await server.listen({
      host: "0.0.0.0",
      port: Number(PORT),
    });

    console.log(`Server ready at http://localhost:${PORT}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
