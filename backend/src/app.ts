import dotenv from "dotenv";
import express from "express";

dotenv.config({
  path: ".env",
});

const app = express();

app.get("/", (req, res) => {
  res.json({ name: "hello" });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`listening on port ${process.env.APP_PORT}`);
});
