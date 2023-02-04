import { AiOutlinePlus } from "react-icons/ai";
import { useAppSelector } from "../../app/hooks";
import { Blog, Post } from "../../app/types";
import CreateEditPostModal from "./CreatePostModal.component";
import DeletePostModal from "./DeletePostModal.component";
import BlogPost from "./BlogPost.component";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogPage = ({ blog }: { blog: Blog }) => {
  const navigate = useNavigate();
  const currentUserId = useAppSelector((state) => state.user._id);
  const [createPostModal, setCreatePostModal] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [currentPost, setCurrentPost] = useState({} as Post);
  return (
    <div className="flex flex-col items-center mt-2 mb-3">
      <div className="text-3xl pb-3 text-center">
        <span className="text-blue-6 font-bold">{blog.title}</span> by{" "}
        <span
          onClick={() => navigate(`/user/${blog.authorId}`)}
          className="text-red-6 font-mono cursor-pointer transition-all hover:(text-red-4)"
        >
          {blog.authorName}
        </span>
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
          <button
            onClick={() => setCreatePostModal(true)}
            className="w-fit mb-2 text-amber-6 text-xl decoration-none outline-none bg-transparent border-none cursor-pointer animate-pulse-alt font-bold flex justify-center items-center gap-1"
          >
            <AiOutlinePlus />
            Create a new post!
          </button>
          <CreateEditPostModal
            opened={createPostModal}
            setOpened={setCreatePostModal}
            mode="createPost"
            currentBlog={blog._id}
          />
          <DeletePostModal
            opened={deletePostModal}
            setOpened={setDeletePostModal}
            currentPost={currentPost._id}
          />
          <CreateEditPostModal
            opened={editPostModal}
            setOpened={setEditPostModal}
            mode="editPost"
            post={currentPost}
          />
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
            <BlogPost
              setCurrentPost={setCurrentPost}
              setDeletePostModal={setDeletePostModal}
              setEditPostModal={setEditPostModal}
              post={post}
              key={post._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
