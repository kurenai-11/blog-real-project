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
      username: null,
      auth: null,
      successful: false,
      message: "Auth key is not valid, relogin.",
      // code 11 - not valid auth key
      code: 11,
    });
    return false;
  }
  if (!isValidKeyDate) {
    res.status(200).send({
      username: null,
      auth: null,
      successful: false,
      message: "Auth key has expired, relogin.",
      // code 12 - expired auth key
      code: 12,
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
