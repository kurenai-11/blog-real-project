import dotenv from "dotenv";
import express from "express";

dotenv.config({
  path: ".env",
});

const app = express();

app.get("/", (req, res) => {
  res.json({ name: "hello" });
});

const port = process.env.APP_PORT || 5000;

app.listen(port, () => {
  console.log(`listening on port ${process.env.APP_PORT}`);
});
