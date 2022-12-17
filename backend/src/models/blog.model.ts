import { Schema, model } from "mongoose";

interface IBlog {
  blogId: number;
  title: string;
  description: string;
  authorName: string;
  authorId: number;
  creationDate: Date;
  posts: Array<number>;
}

const blogSchema = new Schema<IBlog>({
  blogId: { type: Number, required: true },
  title: { type: String, required: true },
  description: String,
  authorName: { type: String, required: true },
  authorId: { type: Number, required: true },
  creationDate: { type: Date, default: Date.now, required: true },
  posts: [Number],
});

export const Blog = model<IBlog>("Blog", blogSchema);
