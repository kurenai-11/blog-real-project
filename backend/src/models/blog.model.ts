import { Schema, model, Types } from "mongoose";

interface IBlog {
  blogId: number;
  title: string;
  description: string;
  authorName: string;
  authorId: number;
  posts: Array<number>;
}

const blogSchema = new Schema<IBlog>({
  blogId: { type: Number, required: true },
  title: { type: String, required: true },
  description: String,
  authorName: { type: String, required: true },
  authorId: { type: Number, required: true },
  posts: [Number],
});

export const Blog = model<IBlog>("Blog", blogSchema);
