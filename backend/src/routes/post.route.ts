import express from "express";
import { z } from "zod";
import { checkAuthKey } from "../controllers/auth.controller.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { genericInvalidRequest } from "../utils.js";
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
});

// Return recent public posts in any blog
router.get("/", (req, res) => {
  res.send("ok");
});

// Delete a post
router.delete("/", async (req, res) => {
  const rawData = req.body;
  const deleteData = ZDeletePostData.safeParse(rawData);
  if (!deleteData.success) {
    genericInvalidRequest(res);
    return;
  }
  const { authKey, userId, postId } = deleteData.data;
  const foundUser = await User.findById(userId);
  if (!foundUser) {
    genericInvalidRequest(res);
    return;
  }
  const isAuth = checkAuthKey(authKey, foundUser, res);
  if (!isAuth) {
    return;
  }
  const foundPost = await Post.findById(postId);
  if (!foundPost) {
    genericInvalidRequest(res);
    return;
  }
  if (foundPost.authorId !== foundUser._id) {
    genericInvalidRequest(res);
    return;
  }
  await foundPost.remove();
  res.status(200).send({ status: "success" });
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
