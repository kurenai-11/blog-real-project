import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout, storeUserData } from "../auth/userSlice";
import { AiOutlinePlus } from "react-icons/ai";
import AddEditBlogModal from "./AddEditBlogModal.component";
import { twMerge } from "tailwind-merge";
import { useGetAuthenticatedUserDataQuery } from "../api/apiSlice";
import { useEffect, useState } from "react";
import BlogList from "../blog-list/BlogList.component";
import Loading from "../shared/Loading.component";
import Avatar from "../shared/Avatar.component";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const { username, avatarUrl, blogs, _id: userId, auth } = user;
  // ternary operator even on an empty array always returns true,
  // so we need to check manually if blogs data exist to use it there
  // so check if undefined first, and then check if it is an empty array or not then
  const areThereAnyBlogs = blogs ? (blogs.length !== 0 ? true : false) : false;
  const [addBlogModal, setAddBlogModal] = useState(false);
  const {
    data: userData,
    isLoading,
    isSuccess,
  } = useGetAuthenticatedUserDataQuery({
    userId,
    authKey: auth?.authKey,
  });
  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    dispatch(storeUserData(userData));
  }, [userData]);
  const linkClasses =
    "text-xl text-amber-6 bg-transparent border-none animate-pulse-alt flex items-center justify-center gap-1 cursor-pointer decoration-none";
  return (
    <>
      <div className="flex flex-col items-center pt-8">
        <div className="text-4xl pb-4 font-bold">Dashboard</div>
        <Avatar avatarUrl={avatarUrl} />
        <div className="text-2xl mb-2">
          Hello{" "}
          <span
            onClick={() => navigate(`/user/${userId}`)}
            className="text-red-5 hover:text-red-3 cursor-pointer transition-all font-bold"
          >
            {username}!
          </span>
        </div>
        <button
          onClick={() => dispatch(logout())}
          className="cursor-pointer border-none px-4 py-2 text-lg bg-zinc-6 rounded-lg text-zinc-2"
        >
          Log out
        </button>
      </div>
      <AddEditBlogModal
        type="addBlog"
        opened={addBlogModal}
        modalTitle="Create a blog"
        setOpenedModal={setAddBlogModal}
      />
      {areThereAnyBlogs ? (
        <div className="">
          <div className="flex flex-col items-center md:relative">
            <button
              className={twMerge(
                linkClasses,
                "md:(absolute top-6 bottom-2 left-[calc(100vw-35vw)] py-4 px-4 mt-0) mt-4 w-fit bg-zinc-9 rounded-xl py-2 px-4"
              )}
              onClick={() => setAddBlogModal(true)}
            >
              <AiOutlinePlus />
              Create new!
            </button>
            <div className="m-auto text-center text-emerald-6 font-bold text-3xl pt-4 md:pt-6 pb-2 w-fit">
              Your blogs:
            </div>
          </div>
          <BlogList mode="dashboard" blogs={blogs} />
        </div>
      ) : isLoading ? (
        <Loading />
      ) : (
        <div className="my-4 text-lg flex flex-col justify-center items-center">
          <div className="font-bold text-blueGray-5 mb-1">
            You don't have any blogs yet...
          </div>
          <button onClick={() => setAddBlogModal(true)} className={linkClasses}>
            <AiOutlinePlus />
            Want to create one?
          </button>
        </div>
      )}
    </>
  );
};

export default Dashboard;
