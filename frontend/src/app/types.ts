export type Blog = {
  _id: number;
  authorId: number;
  authorName: string;
  creationDate: Date;
  description: string;
  posts: Post[];
  title: string;
};
export type User = {};
export type Post = {};
export type Comment = {};
