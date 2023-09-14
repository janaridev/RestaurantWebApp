import express from "express";
import cors from "cors";

const app = express();
const port = Number(Bun.env.PORT);

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({ message: "Hello World" });
});

port
  ? app.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    })
  : console.error("Port is undefined or is busy");
