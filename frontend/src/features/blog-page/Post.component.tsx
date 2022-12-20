import { Post } from "../../app/types";

type PostProps = {
  post: Post;
};

const BlogPost = ({ post }: PostProps) => {
  return (
    <div className="flex flex-col items-center bg-zinc-9 rounded-xl px-4 py-3">
      <h1 className="text-3xl font-extrabold text-bluegray-300">
        {post.title}
      </h1>
      <p className="my-3 text-gray-400 text-xl">{post.content}</p>
      {new Date(post.creationDate).toLocaleString()} by {post.authorName}
    </div>
  );
};

export default BlogPost;
