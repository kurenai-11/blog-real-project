import express from "express";
import cors from "cors";
import { connect as connectToDB } from "./db/db.js";
import userRouter from "./routes/user.route.js";
import blogRouter from "./routes/blog.route.js";
import postRouter from "./routes/post.route.js";
import authRouter from "./routes/auth.route.js";
import { Error } from "mongoose";
import { initializeCounters } from "./db/counter.js";
import { User } from "./models/user.model.js";
import { Blog } from "./models/blog.model.js";
import { Post } from "./models/post.model.js";
import { Comment } from "./models/comment.model.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// loading models before setting up the routers
User;
Blog;
Post;
Comment;

// Routes
app.get("/", (req, res) => {
  res.send("yes the server is working");
});
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/post", postRouter);

const port = process.env.PORT;
const url = process.env.MONGO_URL;

const start = async () => {
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
};

start();
