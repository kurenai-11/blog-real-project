import { model, Schema } from "mongoose";

interface IPost {
  postId: number;
  title: string;
  content: string;
  authorId: number;
  isChild: boolean;
  parentId?: number;
  childrenPosts: Array<number>;
  likes: number;
}

const postSchema = new Schema<IPost>({
  postId: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: Number, required: true },
  isChild: { type: Boolean, required: true },
  parentId: Number,
  childrenPosts: [Number],
  likes: { type: Number, required: true },
});

export const Post = model<IPost>("Post", postSchema);
