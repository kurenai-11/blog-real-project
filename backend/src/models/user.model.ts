import { Schema, model } from "mongoose";

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
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  displayName: String,
  password: { type: String, required: true },
  auth: {
    type: {
      authKey: { type: String, required: true },
      // to post-process with 1 week validity
      validUntil: {
        type: Date,
        required: true,
      },
    },
    required: true,
  },
  email: String,
  blogs: [Number],
  creationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  avatarUrl: { type: String, default: "https://cataas.com/cat" },
});

export const User = model<IUser>("User", userSchema);
