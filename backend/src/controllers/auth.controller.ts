import { IUser, User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Document, Types } from "mongoose";
import { Response } from "express";
import { errorResponse } from "../routes/auth.route.js";

type FoundUserType = Document<unknown, any, IUser> &
  IUser & {
    _id: Types.ObjectId;
  };

type AuthDataSignUp = {
  username: string;
  password: string;
};

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
  authKey: string,
  foundUser: FoundUserType,
  res: Response
) => {
  const isValidKey = authKey === foundUser.auth.authKey;
  const dateNow = new Date();
  const isValidKeyDate =
    foundUser.auth.validUntil.getTime() > dateNow.getTime();
  if (!isValidKey) {
    errorResponse(
      "auth key is not valid, relogin",
      AuthCodes.LOGIN_AUTH_KEY_FAIL,
      res
    );
    return false;
  }
  if (!isValidKeyDate) {
    errorResponse(
      "auth key has expired, relogin",
      AuthCodes.LOGIN_AUTH_KEY_EXPIRED,
      res
    );
    return false;
  }
  return true;
};

export const signUpWithLogin = async (
  username: string,
  password: string
): Promise<[string, Date]> => {
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

export const checkPassword = async (
  password: string,
  foundUser: FoundUserType
) => {
  return await bcrypt.compare(password, foundUser.password);
};
