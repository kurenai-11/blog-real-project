import dotenv from "dotenv";
import express from "express";
import { connect as connectToDB } from "./db/db.js";

dotenv.config({
  path: ".env",
});

const app = express();

app.get("/", (req, res) => {
  res.json({ name: "hello" });
});

const port = process.env.APP_PORT || "5000";

const start = async () => {
  try {
    await connectToDB(process.env.DB_URL);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (error) {
    if (error.name === "MongooseServerSelectionError") {
      console.error(`Can't connect to db ${process.env.DB_URL}`);
    }
  }
};

start();
