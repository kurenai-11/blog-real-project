import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useAppSelector } from "../../app/hooks";
import { Blog } from "../../app/types";

type BlogListProps = {
  blogs: Blog[];
  mode: "list";
};
type BlogDashboardProps = {
  blogs: Blog[];
  mode: "dashboard";
  setCurrentBlog: React.Dispatch<React.SetStateAction<Blog>>;
};

const BlogList = (props: BlogListProps | BlogDashboardProps) => {
  const { blogs, mode } = props;
  let setCurrentBlog: React.Dispatch<React.SetStateAction<Blog>>;
  props.mode === "dashboard" && (setCurrentBlog = props.setCurrentBlog);
  const linkClasses =
    "decoration-none mx-2 text-white text-lg bg-zinc-6 rounded-lg px-4 py-2 hover:text-zinc-3 transition-all";
  const currentUserId = useAppSelector((state) => state.user._id);
  return (
    <div className="h-full pb-4 rounded-lg bg-zinc-9 opacity-80 mb-2">
      {blogs.map((blog, index) => {
        const {
          title,
          description,
          authorId,
          authorName,
          _id: blogId,
          creationDate,
        } = blog;
        return (
          <div
            key={index}
            className="text-bluegray-3 flex flex-col items-center my-2"
          >
            <div className="text-2xl text-zinc-1 font-bold py-3 px-4 text-center">
              <Link
                to={`/blogs/${blogId}`}
                className={twMerge(
                  "decoration-none transition-all color-inherit",
                  mode === "list" && "text-fuchsia-6 hover:(text-fuchsia-4)"
                )}
              >
                {title}
              </Link>{" "}
              {mode === "list" && (
                <>
                  by{" "}
                  <span
                    className={
                      currentUserId === authorId ? "text-blue-6" : "text-red-6"
                    }
                  >
                    {authorName}
                    {currentUserId === authorId ? " (You)" : ""}
                  </span>
                </>
              )}
            </div>
            <div className="rounded-lg bg-zinc-6 bg-opacity-20 w-fit h-full text-center mb-3 px-20 font-serif text-xl">
              {description}
            </div>
            <div className="mb-2">
              Created at: {new Date(creationDate).toLocaleString()}
            </div>
            <div className="my-3">
              {mode === "dashboard" && (
                <a
                  href="#editBlog"
                  className={twMerge(
                    linkClasses,
                    "bg-amber-6 hover:(bg-amber-7)"
                  )}
                  onClick={() => setCurrentBlog(blog)}
                >
                  Edit
                </a>
              )}
              <Link
                to={`/blogs/${blogId}`}
                className={twMerge(
                  linkClasses,
                  "bg-green-6 hover:(bg-green-7)"
                )}
              >
                Go into
              </Link>
              {mode === "dashboard" && (
                <a
                  href="#deleteBlog"
                  className={twMerge(linkClasses, "bg-red-6 hover:(bg-red-7)")}
                  onClick={() => setCurrentBlog(blog)}
                >
                  Delete
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlogList;
