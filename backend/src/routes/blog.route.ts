import express from "express";
import { z } from "zod";
import { checkAuthKey } from "../controllers/auth.controller.js";
import { Blog } from "../models/blog.model.js";
import { User } from "../models/user.model.js";
const router = express.Router();

const ZCreateBlogData = z.object({
  title: z.string(),
  description: z.string(),
  userId: z.number(),
  authKey: z.string(),
});

// Get recently created blogs by default
router.get("/", (req, res) => {
  console.log("req :>> ", req);
});

// Create a blog
router.post("/", async (req, res) => {
  console.log("create blog request");
  const createBlogData = ZCreateBlogData.safeParse(req.body);
  if (!createBlogData.success) {
    res.status(200).send({ status: "fail", error: "Invalid request" });
    return;
  }
  const { title, description, userId, authKey } = createBlogData.data;
  const foundUser = await User.findOne({ userId });
  if (!foundUser) {
    res.status(200).send({ status: "fail", error: "Invalid request" });
    return;
  }
  if (!checkAuthKey(authKey, foundUser, res)) {
    // response is already sent in the checkAuthKey function
    return;
  }
  // now we are sure that all the data is correct
  // and the user's request is all valid
  const blogId = await Blog.countDocuments();
  const newBlog = new Blog({
    title,
    description,
    authorName: foundUser.username,
    authorId: userId,
    blogId,
  });
  newBlog.save();
  // update user data
  await User.updateOne(
    { userId: foundUser.userId },
    { $push: { blogs: blogId } }
  );
  console.log(`blog ${title} by the user ${foundUser.username} is created.`);
  res.status(200).send({
    status: "success",
    blogId,
  });
});

// Get blog data by the blog Id
router.get("/:id", (req, res) => {
  const rawData = req.params;
  console.log("rawData :>> ", rawData);
  // Blog.find({authorId: })
});

// Same as above but for authenticated users
// to be able to retrieve private data
router.post("/:id", (req, res) => {
  const rawData = req.body;
  console.log("rawData", rawData);
});

// Edit a blog == add a new post
router.put("/:id", (req, res) => {
  console.log("req");
});

// Delete a blog
router.delete("/:id", (req, res) => {
  console.log("req");
});

export default router;
