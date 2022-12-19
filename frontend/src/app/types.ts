export type Blog = {
  _id: number;
  authorId: number;
  authorName: string;
  creationDate: string;
  description: string;
  posts: Post[] | number[];
  title: string;
};
export type User = {
  _id: number;
  username: string;
  password?: string;
  auth?: {
    authKey: string;
    validUntil: string;
  };
  blogs?: Blog[] | number[];
  avatarUrl: string;
  creationDate: string;
};
export type Post = {};
export type Comment = {};
