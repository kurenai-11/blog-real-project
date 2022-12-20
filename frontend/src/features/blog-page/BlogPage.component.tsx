import { AiOutlinePlus } from "react-icons/ai";
import { useAppSelector } from "../../app/hooks";
import { Blog } from "../../app/types";
import CreatePostModal from "./CreatePostModal.component";
import BlogPost from "./Post.component";

const BlogPage = ({ blog }: { blog: Blog }) => {
  const currentUserId = useAppSelector((state) => state.user._id);
  return (
    <div className="flex flex-col items-center mt-2 mb-3">
      <div className="text-3xl pb-3">
        <span className="text-blue-6 font-bold">{blog.title}</span> by{" "}
        <span className="text-red-6 font-mono">{blog.authorName}</span>
      </div>
      <div className="w-85% h-1 bg-teal-8 rounded-lg" />
      <div className="flex flex-col w-full items-center">
        <div className="text-lg font-serif mt-2 mb-2 text-center rounded-lg">
          {blog.description}
        </div>
        <div className="w-85% h-1 bg-teal-8 rounded-lg mb-2" />
        <div className="text-xl mb-3 text-center">
          Blog created at{" "}
          <span className="font-bold">
            {new Date(blog.creationDate).toDateString()}
          </span>
        </div>
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
        <div className="flex flex-col gap-2 w-85%">
          {blog.posts.map((post) => (
            <BlogPost post={post} key={post._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
