import express from "express";
import { z } from "zod";
import { checkAuthKey } from "../controllers/auth.controller.js";
import { User } from "../models/user.model.js";
import { genericInvalidRequest } from "../utils.js";
const router = express.Router();

const ZAuthData = z.object({
  authKey: z.string(),
});
const ZUserRequest = z.object({
  userId: z.coerce.number().nonnegative(),
});

// todo: return recent created users
router.get("/", (_, res) => {
  res.status(404).send({ user: "not_found", error: "no_id_specifier" });
});

// Getting user data
// return: user data, list of blogs, list of posts,
// and list of comments of that user
router.get("/:userId", async (req, res) => {
  const userRequest = ZUserRequest.safeParse(req.params);
  if (!userRequest.success) return genericInvalidRequest(res);
  const foundUser = await User.findOne(
    {
      _id: userRequest.data.userId,
    },
    { password: 0, auth: 0 }
  ).populate("blogs");
  if (!foundUser) return genericInvalidRequest(res);
  res.status(200).send({ user: foundUser.toJSON(), status: "success" });
});

// same as above, but for the authorized user who has authKey
router.post("/:userId", async (req, res) => {
  const userAuth = ZAuthData.safeParse(req.body);
  if (!userAuth.success) {
    genericInvalidRequest(res);
    return;
  }
  const userRequest = ZUserRequest.safeParse(req.params);
  if (!userRequest.success) {
    genericInvalidRequest(res);
    return;
  }
  const foundUser = await User.findOne({ _id: userRequest.data.userId });
  if (!foundUser) {
    genericInvalidRequest(res);
    return;
  }
  const isValidAuth = checkAuthKey(userAuth.data.authKey, foundUser, res);
  if (!isValidAuth) {
    // response is already sent in the checkAuthKey()
    return;
  }
  const user = await User.findOne(
    { _id: userRequest.data.userId },
    { password: 0, auth: 0 }
  ).populate("blogs");
  res.status(200).send({
    status: "success",
    user: user!.toJSON(),
  });
});

// Updating user data
// changing username, avatar etc
// ## not implemented yet
router.patch("/:id", (_, res) => {
  res.status(200).send("todo");
});

// Deleting a user
// authenticating with a password AND an auth key for double protection
// ## nott implemented yet
router.delete("/:id", (_, res) => {
  res.status(200).send("todo");
});

export default router;
