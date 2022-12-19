import { model, Schema } from "mongoose";

interface IComment {
  _id: number;
  content: string;
  authorId: number;
  creationDate: Date;
  parentPostId: number;
  childrenComments: number[];
  likes: number;
}

const commentSchema = new Schema<IComment>({
  _id: { type: Number, required: true },
  content: { type: String, required: true },
  authorId: { type: Number, ref: "User", required: true },
  creationDate: { type: Date, default: Date.now, required: true },
  parentPostId: { type: Number, ref: "Post", required: true },
  childrenComments: {
    type: [Number],
    ref: "Comment",
    required: true,
    default: [],
  },
  likes: { type: Number, required: true, default: 0 },
});

export const Comment = model<IComment>("Comment", commentSchema);
