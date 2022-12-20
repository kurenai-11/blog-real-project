import express from "express";
import { z } from "zod";
const router = express.Router();

const ZEditPostData = z.object({
  authKey: z.string(),
  userId: z.number().nonnegative(),
  postId: z.number().nonnegative(),
  blogId: z.number().nonnegative(),
  content: z.string(),
});
const ZDeletePostData = z.object({
  authKey: z.string(),
  userId: z.number().nonnegative(),
  postId: z.number().nonnegative(),
  blogId: z.number().nonnegative(),
});

// Return recent public posts in any blog
router.get("/", (req, res) => {
  res.send("ok");
});

// Return recent public posts by a user id
router.get("/user/:id", (req, res) => {
  res.send("ok");
});

// Return recent public posts by a blog id
router.get("/blog/:id", (req, res) => {
  res.send("ok");
});

export default router;
