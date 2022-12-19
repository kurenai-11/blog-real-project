import { Schema, model } from "mongoose";

interface IBlog {
  _id: number;
  title: string;
  description: string;
  authorName: string;
  authorId: number;
  creationDate: Date;
  posts: number[];
}

const blogSchema = new Schema<IBlog>({
  _id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  authorName: { type: String, required: true },
  authorId: { type: Number, ref: "User", required: true },
  creationDate: { type: Date, default: Date.now, required: true },
  posts: { type: [Number], ref: "Post", required: true, default: [] },
});

export const Blog = model<IBlog>("Blog", blogSchema);
