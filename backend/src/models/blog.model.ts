import { Schema, model, Types } from "mongoose";

interface IBlog {
  id: number;
  title: string;
  description: string;
  authorName: string;
  authorId: number;
  posts: Array<number>;
}
