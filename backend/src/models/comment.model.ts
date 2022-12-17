import { model, Schema } from "mongoose";

interface IComment {
  commentId: number;
  content: string;
  authorId: number;
  creationDate: Date;
  parentId: number;
  childrenComments: Array<number>;
  likes: number;
}

const commentSchema = new Schema<IComment>({
  commentId: { type: Number, required: true },
  content: { type: String, required: true },
  authorId: { type: Number, required: true },
  creationDate: { type: Date, default: Date.now, required: true },
  parentId: { type: Number, required: true },
  childrenComments: [Number],
  likes: { type: Number, required: true },
});

export const Comment = model<IComment>("Comment", commentSchema);
