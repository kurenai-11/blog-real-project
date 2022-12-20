export type Blog = {
  _id: number;
  authorId: number;
  authorName: string;
  creationDate: string;
  description: string;
  posts: Post[];
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
  blogs: Blog[];
  avatarUrl: string;
  creationDate: string;
};
export type Post = {
  _id: number;
  title: string;
  content: string;
  authorId: number;
  creationDate: string;
  likes: number;
};
export type Comment = {};
