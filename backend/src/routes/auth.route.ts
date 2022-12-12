import express from "express";
import {
  AuthData,
  checkAuthKey,
  loginWithLogin,
  signUpWithLogin,
} from "../controllers/auth.controller.js";
import { User } from "../models/user.model.js";
const router = express.Router();

// Auth route
router.post("/", async (req, res) => {
  // validate function, to rewrite better later
  // or use a validation library
  const userData = req.body;
  const checkValidity = (val: any) => {
    if (!(typeof val.username === "string")) {
      return false;
    }
    if (!(typeof val.password === "string")) {
      return false;
    }
    if (
      !(
        typeof val.confirmPassword === "string" ||
        typeof val.confirmPassword === "undefined"
      )
    ) {
      return false;
    }
    return true;
  };
  if (!checkValidity(userData)) {
    res.status(200).send({ error: "input is invalid" });
    return;
  }
  const userToAuth: AuthData = req.body;
  const foundUser = await User.findOne({ username: userToAuth.username });
  // if sign up
  if (userToAuth.confirmPassword) {
    // Check if user already exists
    if (foundUser) {
      res.status(409).send({ error: "user already exists" });
      return;
    }
    const [authKey, validUntil] = await signUpWithLogin(userToAuth);
    res.status(200).send({
      username: userToAuth.username,
      auth: { authKey, validUntil },
      successful: true,
    });
    // else login
  } else {
    // user does not exist so login is not successful
    if (!foundUser) {
      res.status(200).send({
        username: null,
        auth: null,
        successful: false,
      });
      return;
    }
    // check if user has authKey, if it exists login with it and username only
    if (userToAuth.authKey) {
      const check = checkAuthKey(userToAuth, foundUser, res);
      if (!check) return;
      // if the code goes here, we are sure that both the key is valid
      // and it hasn't expired, so we just return the authentication
      // we will handle expired auth and invalid auth keys on the client side
      // by automatically logging out the user and deleting the auth key
      // so no extra work is needed here
      res.status(200).send({
        username: userToAuth.username,
        auth: {
          authKey: userToAuth.authKey,
        },
        successful: true,
      });
      // else login with login credentials
    } else {
      const result = await loginWithLogin(userToAuth, foundUser);
      // if the login is unsuccessful = wrong password
      if (!result) {
        res.status(200).send({
          username: null,
          auth: null,
          successful: false,
        });
        return;
      }
      // login successful = create new authKey and return it with valid date
      foundUser.auth.authKey = crypto.randomUUID();
      const dateNow = new Date();
      // the auth key is valid only 1 week
      foundUser.auth.validUntil = new Date(
        dateNow.setDate(dateNow.getDate() + 7)
      );
      await foundUser.save();
      res.status(200).send({
        username: foundUser.username,
        auth: {
          authKey: foundUser.auth.authKey,
          validUntil: foundUser.auth.validUntil,
        },
        successful: true,
        // code 10 means "successful login which returns authKey"
        code: 10,
      });
    }
  }
});

export default router;
