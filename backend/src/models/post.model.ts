interface IPost {
  id: number;
  title: string;
  content: string;
  authorId: number;
  parent: number;
  childrenPosts: Array<number>;
  likes: number;
}
