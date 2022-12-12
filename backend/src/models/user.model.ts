import { Schema, model, Types } from "mongoose";

export interface IUser {
  username: string;
  password: string;
  auth: {
    authKey: string;
    validUntil: Date;
  };
  email: string;
  blogs: Array<Types.ObjectId>;
  creationDate: Date;
  avatarUrl: string;
}

const userSchema = new Schema<IUser>({
  username: String,
  password: String,
  auth: {
    authKey: String,
    // to post-process with 1 week validity
    validUntil: {
      type: Date,
    },
  },
  email: String,
  blogs: [Schema.Types.ObjectId],
  creationDate: {
    type: Date,
    default: Date.now,
  },
  avatarUrl: String,
});

export const User = model<IUser>("User", userSchema);
