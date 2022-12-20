import { AiOutlinePlus } from "react-icons/ai";
import { useAppSelector } from "../../app/hooks";
import { Blog } from "../../app/types";
import CreatePostModal from "./CreatePostModal.component";
import BlogPost from "./Post.component";

const BlogPage = ({ blog }: { blog: Blog }) => {
  const currentUserId = useAppSelector((state) => state.user._id);
  return (
    <div className="flex flex-col items-center mt-2 mb-3">
      <div className="text-3xl mb-3">
        <span className="text-blue-6 font-bold">{blog.title}</span> by{" "}
        <span className="text-red-6 font-mono">{blog.authorName}</span>
      </div>
      {currentUserId === blog.authorId && (
        <>
          <a
            href="#createPost"
            className="w-fit mb-2 text-amber-6 text-xl decoration-none animate-pulse-alt font-bold flex justify-center items-center gap-1"
          >
            <AiOutlinePlus />
            Create a new post!
          </a>
          <CreatePostModal currentBlog={blog._id} />
        </>
      )}
      {blog.posts.length === 0 ? (
        <div className="flex flex-col items-center">
          <div className="text-center text-2xl">
            There are no posts here yet...
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-2">
            {blog.posts.map((post) => (
              <BlogPost post={post} key={post._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
