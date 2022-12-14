import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../auth/userSlice";
import Footer from "../shared/Footer.component";
import Navbar from "../shared/Navbar.component";
import { AiOutlinePlus } from "react-icons/ai";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { username, avatarUrl, blogs } = user;
  const clickHandler = () => {
    dispatch(logout());
  };
  return (
    <div className="bg-zinc-8 min-h-screen text-zinc-2 flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center pt-8">
        <div className="text-4xl pb-4 font-bold">Dashboard</div>
        <div className="flex justify-center items-center rounded-full border border-zinc-2 w-28 h-28 bg-zinc-6 mb-2">
          {avatarUrl ? null : (
            <span className="font-bold text-lg">No avatar</span>
          )}
        </div>
        <div className="text-2xl mb-2">
          Hello <span className="text-red-5 font-bold">{username}!</span>
        </div>
        <button
          onClick={clickHandler}
          className="border-none px-4 py-2 text-lg bg-zinc-6 rounded-lg text-zinc-2"
        >
          Log out
        </button>
      </div>
      {blogs ? (
        <div>
          <div className="text-center text-3xl py-6">Your blogs:</div>
        </div>
      ) : (
        <div className="text-center m-4 text-lg">
          <div className="font-bold text-blueGray-5 mb-1">
            You don't have any blogs yet.
          </div>
          <div className="text-xl text-amber-6 animate-pulse flex items-center justify-center gap-1 cursor-pointer">
            <AiOutlinePlus />
            Want to create one?
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Dashboard;
