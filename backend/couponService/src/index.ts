import { config } from "dotenv";
config();

import buildServer from "./server";
import { connectToMongoDB } from "./utils/dbConnection";

const server = buildServer();
const PORT = process.env.PORT;

async function main() {
  try {
    await connectToMongoDB();
    await server.listen(PORT, "0.0.0.0");

    console.log(`Server ready at http://localhost:${PORT}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
