import { model, Schema } from "mongoose";

interface IPost {
  _id: number;
  title: string;
  content: string;
  authorId: number;
  creationDate: Date;
  isChild: boolean;
  parentId: number;
  childrenPosts: number[];
  likes: number;
}

const postSchema = new Schema<IPost>({
  _id: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: Number, ref: "User", required: true },
  creationDate: { type: Date, default: Date.now, required: true },
  isChild: { type: Boolean, required: true },
  parentId: { type: Number, ref: "Post", required: true, default: -1 },
  childrenPosts: { type: [Number], ref: "Post", required: true, default: [] },
  likes: { type: Number, required: true, default: 0 },
});

export const Post = model<IPost>("Post", postSchema);
