import express from "express";
import { z } from "zod";
import { checkAuthKey } from "../controllers/auth.controller.js";
import { getBlogsByUserId } from "../controllers/blog.controller.js";
import { User } from "../models/user.model.js";
const router = express.Router();

const ZAuthData = z.object({
  authKey: z.string(),
});
const ZUserRequest = z.object({
  userId: z.coerce.number().nonnegative(),
});

// todo: return recent created users
router.get("/", (req, res) => {
  res.status(404).send({ user: "not_found", error: "no_id_specifier" });
});

// Getting user data
// return: user data, list of blogs, list of posts,
// and list of comments of that user
router.get("/:id", (req, res) => {
  console.log("req :>> ", req.params);
  res.status(200).send({ user: 0, status: "success" });
});

// same as above, but for the authorized user who has authKey
router.post("/:userId", async (req, res) => {
  const userAuth = ZAuthData.safeParse(req.body);
  if (!userAuth.success) {
    res
      .status(200)
      .send({ user: null, status: "fail", error: "invalid request" });
    return;
  }
  const userRequest = ZUserRequest.safeParse(req.params);
  if (!userRequest.success) {
    res
      .status(200)
      .send({ user: null, status: "fail", error: "invalid request" });
    return;
  }
  const user = await User.findOne({ userId: userRequest.data.userId });
  if (!user) {
    res
      .status(200)
      .send({ user: null, status: "fail", error: "invalid request" });
    return;
  }
  const isValidAuth = checkAuthKey(userAuth.data.authKey, user, res);
  if (!isValidAuth) {
    res.status(200).send({ user: null, status: "fail", error: "invalid auth" });
    return;
  }
  const blogs = await getBlogsByUserId(user.userId);
  const { username, userId, creationDate, avatarUrl } = user;
  res.status(200).send({
    status: "success",
    user: {
      username,
      userId,
      creationDate,
      avatarUrl,
    },
    blogs,
  });
});

// Updating user data
// changing username, avatar etc
router.put("/:id", (req, res) => {
  res.status(200).send("todo");
});

// Deleting a user
// authenticating with a password AND an auth key for double protection
router.delete("/:id", (req, res) => {
  res.status(200).send("todo");
});

export default router;
