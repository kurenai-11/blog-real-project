import { useAppSelector } from "../../app/hooks";
import { Post } from "../../app/types";

type PostProps = {
  post: Post;
  setCurrentPost: React.Dispatch<React.SetStateAction<Post>>;
};

const BlogPost = ({ post, setCurrentPost }: PostProps) => {
  const currentUserId = useAppSelector((state) => state.user._id);
  return (
    <div className="flex flex-col items-center bg-zinc-9 rounded-xl px-4 py-3">
      <h1 className="text-3xl font-extrabold text-bluegray-300">
        {post.title}
      </h1>
      <div className="my-3 text-gray-400 w-full text-xl text-center px-4 whitespace-pre-wrap">
        {post.content}
      </div>
      {new Date(post.creationDate).toLocaleString()} by {post.authorName}
      {currentUserId === post.authorId && (
        <div className="flex gap-2">
          <a
            href="#editPost"
            className="decoration-none text-lg bg-amber-6 font-bold text-zinc-2 rounded-lg py-1 px-2 mt-3"
            onClick={() => setCurrentPost(post)}
          >
            Edit
          </a>
          <a
            href="#deletePost"
            className="decoration-none text-lg bg-red-6 font-bold text-zinc-2 rounded-lg py-1 px-2 mt-3"
            onClick={() => setCurrentPost(post)}
          >
            Delete
          </a>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
