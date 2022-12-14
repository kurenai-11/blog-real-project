import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connect as connectToDB } from "./db/db.js";
import userRouter from "./routes/user.route.js";
import blogRouter from "./routes/blog.route.js";
import postRouter from "./routes/post.route.js";
import authRouter from "./routes/auth.route.js";
import { MongooseError } from "mongoose";

dotenv.config({
  path: ".env",
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("yes the server is working");
});
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/post", postRouter);

const port = process.env.APP_PORT || "5000";
const url = process.env.DB_URL;

const start = async () => {
  try {
    if (!url) throw new Error("DB_URL environment variable is not set.");
    await connectToDB(url);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (error) {
    if (error instanceof MongooseError) {
      if (error.name === "MongooseServerSelectionError") {
        console.error(`Can't connect to db ${process.env.DB_URL}`);
      } else {
        console.error("Mongoose error: ", error);
      }
    } else {
      console.error("Server error: ", error);
    }
  }
};

start();
