import express from "express";
import cors from "cors";

function buildServer() {
  const server = express();

  server.use(cors());

  server.get("/", (req, res) => {
    res.status(200).send({ message: "Hello World" });
  });

  return server;
}

export default buildServer;
