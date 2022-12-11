import { Schema, model, Types } from "mongoose";

interface IUser {
  username: string;
  password: string;
  email?: string;
  blog: typeof Types.ObjectId;
  creationDate: Date;
  avatar?: string;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  blog: {
    type: Types.ObjectId,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

export const User = model<IUser>("User", userSchema);
