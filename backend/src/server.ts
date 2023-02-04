import app from "./app.js";
import { connect as connectToDB } from "./db/db.js";
import { initializeCounters } from "./db/counter.js";
import { Error } from "mongoose";

const port = process.env.PORT || 5000;
const url = process.env.MONGO_URL;

// using iife to be fancy and start the server
(async () => {
  try {
    if (!url) throw new Error("MONGO_URL environment variable is not set.");
    if (!port) throw new Error("PORT is not set");
    await connectToDB(url);
    initializeCounters();
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (error) {
    if (error instanceof Error.MongooseServerSelectionError) {
      console.error(`Can't connect to db ${process.env.DB_URL}`);
    } else {
      console.error("Server error: ", error);
    }
  }
})();
