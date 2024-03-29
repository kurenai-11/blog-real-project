import express, { Response } from "express";
import {
  checkAuthKey,
  checkPassword,
  signUpWithLogin,
} from "../controllers/auth.controller.js";
import { User } from "../models/user.model.js";
import { AuthCodes } from "../controllers/auth.controller.js";
import { z } from "zod";
const router = express.Router();
import crypto from "crypto";

// Auth data we should receive in a request
// When we will be logging in without an auth key
const ZLoginDataN = z.object({
  username: z.string(),
  password: z.string(),
});
// Auth data with an auth key
const ZLoginData = z.object({
  username: z.string(),
  auth: z.object({
    authKey: z.string(),
  }),
});
// Data we will receive when we are signing up a user
const ZSignUpData = z.object({
  username: z
    .string()
    .min(4, "Username length is too short.")
    .max(20, "Username length is too long."),
  password: z
    .string()
    .min(6, "Password is too short.")
    .max(64, "Password is too long."),
});

const AuthActions = {
  login_noauthkey: "login_noauthkey",
  login_authkey: "login_authkey",
  signup: "signup",
} as const;
type AuthAction = keyof typeof AuthActions;

export const authErrorResponse = (
  errorText: string,
  code: AuthCodes,
  res: Response
) => {
  res.status(401).send({
    status: "fail",
    error: errorText,
    code,
  });
};

type AuthenticatedUser = {
  username: string;
  _id: number;
  auth: {
    authKey: string;
    validUntil: Date;
  };
  code: AuthCodes;
};

const successfulResponse = (user: AuthenticatedUser, res: Response) => {
  res.status(200).send({ ...user, status: "success" });
};

// Auth route
router.post("/", async (req, res) => {
  // schema for the auth action
  const action = z.object({
    action: z.string().refine((val) => {
      return Object.values(AuthActions).includes(val as AuthAction);
    }, "Incorrect auth action."),
  });
  const rawUserData = req.body;
  const authAction = action.safeParse(rawUserData);
  // check if action is valid
  if (!authAction.success) {
    authErrorResponse("request is invalid", AuthCodes.SERVER_WRONG_DATA, res);
    return;
  }
  // authAction is now guaranteed to be one of three values
  // login by auth key
  if (authAction.data.action === AuthActions.login_authkey) {
    const parsedData = ZLoginData.safeParse(rawUserData);
    if (!parsedData.success) {
      authErrorResponse("request is invalid", AuthCodes.SERVER_WRONG_DATA, res);
      return;
    }
    const authByAuthKeyData = parsedData.data;
    const foundUser = await User.findOne({
      username: authByAuthKeyData.username,
    });
    if (!foundUser) {
      authErrorResponse("user does not exist", AuthCodes.LOGIN_WRONG, res);
      return;
    }
    const check = checkAuthKey(authByAuthKeyData.auth.authKey, foundUser, res);
    if (!check) {
      // responses are already sent inside checkAuthKey
      return;
    }
    // now we are sure that the auth key is valid so we just
    // return the authentication
    successfulResponse(
      {
        username: foundUser.username,
        auth: {
          authKey: foundUser.auth.authKey,
          validUntil: foundUser.auth.validUntil,
        },
        code: AuthCodes.SUCCESSFUL_LOGIN_AUTHKEY,
        _id: foundUser._id,
      },
      res
    );
  } else if (authAction.data.action === AuthActions.login_noauthkey) {
    // login without an auth key (by login and password)
    const parsedData = ZLoginDataN.safeParse(rawUserData);
    if (!parsedData.success) {
      authErrorResponse("request is invalid", AuthCodes.SERVER_WRONG_DATA, res);
      return;
    }
    const authWithoutAuthKeyData = parsedData.data;
    const foundUser = await User.findOne({
      username: authWithoutAuthKeyData.username,
    });
    if (!foundUser) {
      authErrorResponse("wrong login or password", AuthCodes.LOGIN_WRONG, res);
      return;
    }
    const result = await checkPassword(
      authWithoutAuthKeyData.password,
      foundUser
    );
    if (!result) {
      authErrorResponse("wrong login or password", AuthCodes.LOGIN_WRONG, res);
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
    successfulResponse(
      {
        username: foundUser.username,
        auth: {
          authKey: foundUser.auth.authKey,
          validUntil: foundUser.auth.validUntil,
        },
        code: AuthCodes.SUCCESSFUL_LOGIN_NOAUTHKEY,
        _id: foundUser._id,
      },
      res
    );
  } else {
    // signup
    const parsedData = ZSignUpData.safeParse(rawUserData);
    if (!parsedData.success) {
      authErrorResponse("request is invalid", AuthCodes.SERVER_WRONG_DATA, res);
      return;
    }
    const authSignupData = parsedData.data;
    const foundUser = await User.findOne({ username: authSignupData.username });
    if (foundUser) {
      authErrorResponse(
        "user already exists",
        AuthCodes.SIGNUP_ACCOUNT_EXISTS,
        res
      );
      return;
    }
    const { username, password } = authSignupData;
    const [authKey, validUntil, userId] = await signUpWithLogin(
      username,
      password
    );
    successfulResponse(
      {
        username: authSignupData.username,
        auth: { authKey, validUntil },
        code: AuthCodes.SUCCESSFUL_SIGNUP,
        _id: userId,
      },
      res
    );
    return;
  }
});

export default router;
