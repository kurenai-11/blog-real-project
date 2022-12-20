import { model, Schema } from "mongoose";

interface IPost {
  _id: number;
  title: string;
  content: string;
  authorId: number;
  authorName: string;
  creationDate: Date;
  likes: number;
}

const postSchema = new Schema<IPost>({
  _id: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: Number, ref: "User", required: true },
  authorName: { type: String, required: true },
  creationDate: { type: Date, default: Date.now, required: true },
  likes: { type: Number, required: true, default: 0 },
});

export const Post = model<IPost>("Post", postSchema);
