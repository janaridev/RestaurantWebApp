import { config } from "dotenv";
config();

import buildServer from "./server";
import { connectToMongoDB } from "./utils/dbConnection";

const server = buildServer();
const PORT = process.env.PORT;

async function main() {
  try {
    await connectToMongoDB();
    await server.listen({
      host: "0.0.0.0",
      port: Number(PORT),
    });
    console.log("Test ci for auth service");

    console.log(`Server ready at http://localhost:${PORT}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
