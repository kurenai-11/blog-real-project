import { Blog } from "../../app/types";

const BlogPage = ({ blog }: { blog: Blog }) => {
  return (
    <div className="flex flex-col items-center mt-2 mb-4">
      <div className="text-3xl mb-3">
        <span className="text-blue-6 font-bold">{blog.title}</span> by{" "}
        <span className="text-red-6 font-mono">{blog.authorName}</span>
      </div>
      {blog.posts.length === 0 ? (
        <div className="text-center text-2xl">
          There are no posts here yet...
        </div>
      ) : (
        <div>
          <div className="text-center text-2xl">Posts:</div>
          {/* to render posts here... */}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
