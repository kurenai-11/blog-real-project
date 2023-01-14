import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import blogRouter from "./routes/blog.route.js";
import postRouter from "./routes/post.route.js";
import authRouter from "./routes/auth.route.js";
import { User } from "./models/user.model.js";
import { Blog } from "./models/blog.model.js";
import { Post } from "./models/post.model.js";
import { Comment } from "./models/comment.model.js";

dotenv.config();

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
app.get("/", (_, res) => {
  res.json({ message: "yes the server is working" });
});
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/post", postRouter);

export default app;
