import buildServer from "./server";

const server = buildServer();
const port = Number(Bun.env.PORT);

function main() {
  port
    ? server.listen(port, () => {
        console.log(`Listening on port ${port}...`);
      })
    : console.error("Port is undefined or is busy");
}

main();
