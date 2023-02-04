import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useAppSelector } from "../../app/hooks";
import { Blog } from "../../app/types";
import AddEditBlogModal from "../dashboard-page/AddEditBlogModal.component";
import DeleteBlogModal from "../dashboard-page/DeleteBlogModal.component";

type BlogListProps = {
  blogs: Blog[];
  mode: "list";
};
type BlogDashboardProps = {
  blogs: Blog[];
  mode: "dashboard";
};

const BlogList = (props: BlogListProps | BlogDashboardProps) => {
  const navigate = useNavigate();
  const { blogs, mode } = props;
  const linkClasses =
    "decoration-none mx-2 border-none cursor-pointer text-white text-lg bg-zinc-6 rounded-lg px-4 py-2 hover:text-zinc-3 transition-all";
  const currentUserId = useAppSelector((state) => state.user._id);
  const [currentBlog, setCurrentBlog] = useState({} as Blog);
  const [editBlogModal, setEditBlogModal] = useState(false);
  const [deleteBlogModal, setDeleteBlogModal] = useState(false);
  return (
    <>
      <AddEditBlogModal
        type="editBlog"
        modalTitle="Edit a blog"
        currentBlog={currentBlog}
        opened={editBlogModal}
        setOpenedModal={setEditBlogModal}
      />
      <DeleteBlogModal
        opened={deleteBlogModal}
        setOpenedModal={setDeleteBlogModal}
        currentBlogId={currentBlog._id}
      />
      <div className="h-full pb-4 flex flex-col opacity-80">
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
              className="text-bluegray-3 flex flex-col rounded-lg bg-zinc-9 items-center my-2"
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
                      onClick={() => navigate(`/user/${authorId}`)}
                      className={twMerge(
                        "transition-all cursor-pointer",
                        currentUserId === authorId
                          ? "text-blue-6 hover:text-blue-4"
                          : "text-red-6 hover:text-red-4"
                      )}
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
              <div className="my-3 pb-3">
                {mode === "dashboard" && (
                  <button
                    className={twMerge(
                      linkClasses,
                      "bg-amber-6 hover:(bg-amber-7)",
                      "h-[42px]"
                    )}
                    onClick={() => {
                      setCurrentBlog(blog);
                      setEditBlogModal(true);
                    }}
                  >
                    Edit
                  </button>
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
                  <button
                    className={twMerge(
                      linkClasses,
                      "bg-red-6 hover:(bg-red-7)"
                    )}
                    onClick={() => {
                      setCurrentBlog(blog);
                      setDeleteBlogModal(true);
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BlogList;
