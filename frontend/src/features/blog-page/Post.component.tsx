import { Post } from "../../app/types";

type PostProps = {
  post: Post;
};

const BlogPost = ({ post }: PostProps) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-extrabold text-bluegray-300">
        {post.title}
      </h1>
      <p className="mt-3 text-gray-400 text-xl">{post.content}</p>
    </div>
  );
};

export default BlogPost;
