import express from "express";
import { z } from "zod";
import { checkAuthKey } from "../controllers/auth.controller.js";
import { getBlodDataByBlogId } from "../controllers/blog.controller.js";
import { findCount, incrementCounter } from "../db/counter.js";
import { Blog } from "../models/blog.model.js";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { Counter } from "../models/counter.model.js";
import { genericInvalidRequest } from "../utils.js";
const router = express.Router();

const ZCreateBlogData = z.object({
  title: z.string(),
  description: z.string(),
  userId: z.number(),
  authKey: z.string(),
});
const ZEditBlogData = z.object({
  title: z.string(),
  description: z.string(),
  authKey: z.string(),
  userId: z.number().nonnegative(),
  blogId: z.number().nonnegative(),
});
const ZDeleteBlogData = z.object({
  authKey: z.string(),
  userId: z.number().nonnegative(),
  blogId: z.number().nonnegative(),
});
const ZAddPostData = z.object({
  title: z.string(),
  content: z.string(),
  authKey: z.string(),
  userId: z.number().nonnegative(),
  blogId: z.number().nonnegative(),
});
const ZGetBlogData = z.object({
  id: z.coerce.number().nonnegative(),
});

// Get recently created blogs by default
router.get("/", (req, res) => {
  console.log("req.params :>> ", req.params);
});

// Create a blog
router.post("/", async (req, res) => {
  const createBlogData = ZCreateBlogData.safeParse(req.body);
  if (!createBlogData.success) {
    genericInvalidRequest(res);
    return;
  }
  const { title, description, userId, authKey } = createBlogData.data;
  const foundUser = await User.findOne({ _id: userId });
  if (!foundUser) {
    genericInvalidRequest(res);
    return;
  }
  if (!checkAuthKey(authKey, foundUser, res)) {
    // response is already sent in the checkAuthKey function
    return;
  }
  // now we are sure that all the data is correct
  // and the user's request is all valid
  const blogCount = await findCount("blog");
  const blogId = blogCount + 1;
  const newBlog = new Blog({
    _id: blogId,
    title,
    description,
    authorName: foundUser.username,
    authorId: userId,
  });
  await newBlog.save();
  await incrementCounter("blog");
  // update user data
  await User.updateOne({ _id: foundUser._id }, { $push: { blogs: blogId } });
  res.status(200).send({
    status: "success",
    blogId,
  });
});

// Add a new post
router.put("/", async (req, res) => {
  const rawData = req.body;
  const addPostData = ZAddPostData.safeParse(rawData);
  if (!addPostData.success) {
    genericInvalidRequest(res);
    return;
  }
  const { content, authKey, userId, blogId, title } = addPostData.data;
  const foundUser = await User.findOne({ _id: userId });
  if (!foundUser) {
    genericInvalidRequest(res);
    return;
  }
  if (!checkAuthKey(authKey, foundUser, res)) {
    return;
  }
  const foundBlog = await Blog.findOne({ _id: blogId });
  if (!foundBlog) {
    genericInvalidRequest(res);
    return;
  }
  if (foundBlog.authorId !== foundUser._id) {
    genericInvalidRequest(res);
    return;
  }
  // creating a new post
  const postCount = await findCount("post");
  const postId = postCount + 1;
  const newPost = new Post({
    _id: postId,
    title,
    content,
    authorName: foundUser.username,
    authorId: foundUser._id,
    blogId: blogId,
  });
  await newPost.save();
  await incrementCounter("post");
  await Blog.updateOne({ _id: blogId }, { $push: { posts: postId } });
  res.status(200).send({ status: "success", post: newPost.toJSON() });
});

// Edit blog parameters
router.patch("/", async (req, res) => {
  const rawData = req.body;
  const blogData = ZEditBlogData.safeParse(rawData);
  if (!blogData.success) {
    genericInvalidRequest(res);
    return;
  }
  const { title, description, authKey, userId, blogId } = blogData.data;
  const foundUser = await User.findOne({ _id: userId });
  if (!foundUser) {
    genericInvalidRequest(res);
    return;
  }
  const isAuth = checkAuthKey(authKey, foundUser, res);
  if (!isAuth) {
    return;
  }
  const foundBlog = await Blog.findById(blogId);
  if (!foundBlog) {
    genericInvalidRequest(res);
    return;
  }
  if (foundBlog.authorId !== userId) {
    genericInvalidRequest(res);
    return;
  }
  foundBlog.title = title;
  foundBlog.description = description;
  await foundBlog.save();
  res.status(200).send({ status: "success", blogId });
});

// Delete a blog
router.delete("/", async (req, res) => {
  const rawData = req.body;
  const deleteBlogData = ZDeleteBlogData.safeParse(rawData);
  if (!deleteBlogData.success) {
    genericInvalidRequest(res);
    return;
  }
  const { authKey, userId, blogId } = deleteBlogData.data;
  const foundUser = await User.findById(userId);
  if (!foundUser) {
    genericInvalidRequest(res);
    return;
  }
  const isAuth = checkAuthKey(authKey, foundUser, res);
  if (!isAuth) {
    return;
  }
  const foundBlog = await Blog.findById(blogId);
  if (!foundBlog) {
    genericInvalidRequest(res);
    return;
  }
  if (foundBlog.authorId !== userId) {
    genericInvalidRequest(res);
    return;
  }
  await Blog.deleteOne({ _id: blogId });
  await User.findByIdAndUpdate({ _id: userId }, { $pull: { blogs: blogId } });
  res.status(200).send({ status: "success" });
});

// Get blog data by the blog Id
router.get("/:id", async (req, res) => {
  const rawData = req.params;
  const getBlogData = ZGetBlogData.safeParse(rawData);
  if (!getBlogData.success) {
    genericInvalidRequest(res);
    return;
  }
  const blogId = getBlogData.data.id;
  const blogData = await getBlodDataByBlogId(blogId);
  if (!blogData) {
    genericInvalidRequest(res);
    return;
  }
  res.status(200).send({ status: "success", ...blogData.toJSON() });
});

export default router;
