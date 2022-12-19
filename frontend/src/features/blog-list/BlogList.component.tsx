import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Blog } from "../../app/types";

type BlogListProps = {
  blogs: Blog[];
};

const BlogList = ({ blogs }: BlogListProps) => {
  const linkClasses =
    "decoration-none mx-2 text-white text-lg bg-zinc-6 rounded-lg px-4 py-2 hover:text-zinc-3 transition-all";
  return (
    <div className="h-full pb-4 rounded-lg bg-zinc-9 opacity-80">
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
              {title}
            </div>
            <div className="rounded-lg bg-zinc-6 bg-opacity-20 w-fit h-full text-center mb-3 px-20 font-serif text-xl">
              {description}
            </div>
            <div className="my-3">
              <a
                href="#editBlog"
                className={twMerge(
                  linkClasses,
                  "bg-amber-6 hover:(bg-amber-7)"
                )}
              >
                Edit
              </a>
              <Link
                to={`/blogs/${blogId}`}
                className={twMerge(
                  linkClasses,
                  "bg-green-6 hover:(bg-green-7)"
                )}
              >
                Go into
              </Link>
              <a
                href="#deleteBlog"
                className={twMerge(linkClasses, "bg-red-6 hover:(bg-red-7)")}
              >
                Delete
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlogList;
