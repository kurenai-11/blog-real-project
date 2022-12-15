import { Schema, model, Types } from "mongoose";

export interface IUser {
  userId: number;
  username: string;
  displayName: string;
  password: string;
  auth: {
    authKey: string;
    validUntil: Date;
  };
  email: string;
  blogs: Array<number>;
  creationDate: Date;
  avatarUrl: string;
}

const userSchema = new Schema<IUser>({
  userId: Number,
  username: String,
  displayName: String,
  password: String,
  auth: {
    authKey: String,
    // to post-process with 1 week validity
    validUntil: {
      type: Date,
    },
  },
  email: String,
  blogs: [Number],
  creationDate: {
    type: Date,
    default: Date.now,
  },
  avatarUrl: String,
});

export const User = model<IUser>("User", userSchema);
