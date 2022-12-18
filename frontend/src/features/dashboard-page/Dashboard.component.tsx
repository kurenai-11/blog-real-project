import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout, storeUserData } from "../auth/userSlice";
import Footer from "../shared/Footer.component";
import Navbar from "../shared/Navbar.component";
import { AiOutlinePlus } from "react-icons/ai";
import AddBlogModal from "./AddBlogModal.component";
import { twMerge } from "tailwind-merge";
import { useGetAuthenticatedUserDataQuery } from "../api/apiSlice";
import { useEffect } from "react";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { username, avatarUrl, blogs, userId, auth } = user;
  const {
    data: userData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAuthenticatedUserDataQuery({
    authorId: userId,
    authKey: auth?.authKey,
  });
  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    dispatch(storeUserData(userData));
  }, [userData]);
  console.log("userData", userData);
  return (
    <div
      className={twMerge(
        "bg-zinc-8 min-h-screen text-zinc-2 flex flex-col font-sans"
      )}
    >
      <Navbar />
      <div className="flex flex-col items-center pt-8">
        <div className="text-4xl pb-4 font-bold">Dashboard</div>
        <div className="flex justify-center items-center rounded-full border border-zinc-2 w-28 h-28 bg-zinc-6 mb-2">
          {avatarUrl ? (
            <img src={avatarUrl} className="w-full h-full rounded-full" />
          ) : (
            <span className="font-bold text-lg cursor-default select-none">
              No avatar
            </span>
          )}
        </div>
        <div className="text-2xl mb-2">
          Hello <span className="text-red-5 font-bold">{username}!</span>
        </div>
        <button
          onClick={() => dispatch(logout())}
          className="cursor-pointer border-none px-4 py-2 text-lg bg-zinc-6 rounded-lg text-zinc-2"
        >
          Log out
        </button>
      </div>
      <AddBlogModal />
      {blogs ? (
        <div>
          <div className="text-center text-3xl py-6">Your blogs:</div>
        </div>
      ) : (
        <div className="my-4 text-lg flex flex-col justify-center items-center">
          <div className="font-bold text-blueGray-5 mb-1">
            You don't have any blogs yet...
          </div>
          <a
            href="#addBlog"
            className="text-xl text-amber-6 bg-transparent border-none animate-pulse-alt flex items-center justify-center gap-1 cursor-pointer decoration-none"
          >
            <AiOutlinePlus />
            Want to create one?
          </a>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Dashboard;
