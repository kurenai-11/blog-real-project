import { IUser, User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Document, Types } from "mongoose";

type FoundUserType = Document<unknown, any, IUser> &
  IUser & {
    _id: Types.ObjectId;
  };

export interface AuthData {
  username: string;
  password?: string;
  confirmPassword?: string;
  foundUser?: FoundUserType;
  authKey?: string;
}

export enum AuthCodes {
  SUCCESSFUL_SIGNUP,
  // login by authkey ↓
  SUCCESSFUL_LOGIN_AUTHKEY,
  // login by login and password, returns authkey ↓
  SUCCESSFUL_LOGIN_NOAUTHKEY,
  SIGNUP_ACCOUNT_EXISTS,
  SIGNUP_AXIOS_UNKNOWN,
  SIGNUP_CLIENT_UNKNOWN,
  SIGNUP_SERVER_UNKNOWN,
  LOGIN_WRONG,
  LOGIN_AUTH_KEY_FAIL,
  LOGIN_AUTH_KEY_EXPIRED,
  LOGIN_AXIOS_UNKNOWN,
  LOGIN_UNKNOWN,
  SERVER_WRONG_DATA,
  CLIENT_INPUT_INVALID,
}

export const checkAuthKey = (
  user: AuthData,
  foundUser: FoundUserType,
  res: any
) => {
  const isValidKey = user.authKey === foundUser.auth.authKey;
  const dateNow = new Date();
  const isValidKeyDate =
    foundUser.auth.validUntil.getTime() > dateNow.getTime();
  if (!isValidKey) {
    res.status(200).send({
      error: "Auth key is not valid, relogin.",
      code: AuthCodes.LOGIN_AUTH_KEY_FAIL,
    });
    return false;
  }
  if (!isValidKeyDate) {
    res.status(200).send({
      error: "Auth key has expired, relogin.",
      code: AuthCodes.LOGIN_AUTH_KEY_EXPIRED,
    });
    return false;
  }
  return true;
};

export const signUpWithLogin = async (user: AuthData) => {
  const { username, password } = user;
  const cryptedPassword = await bcrypt.hash(password, 12);
  const authKey = crypto.randomUUID();
  const dateNow = new Date();
  const validUntil = new Date(dateNow.setDate(dateNow.getDate() + 7));
  const newUser = new User({
    username,
    password: cryptedPassword,
    auth: {
      authKey,
      validUntil,
    },
  });
  await newUser.save();
  console.log(`user ${username} created.`);
  return [authKey, validUntil];
};

export const loginWithLogin = async (
  userToAuth: AuthData,
  foundUser: FoundUserType
) => {
  return await bcrypt.compare(userToAuth.password, foundUser.password);
};
