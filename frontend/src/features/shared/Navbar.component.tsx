import { NavLink } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
  useAuthenticated,
} from "../../app/hooks";
import { logout } from "../auth/userSlice";

const Navbar = () => {
  const user = useAppSelector((state) => state.user);
  const isAuthenticated = useAuthenticated();
  const dispatch = useAppDispatch();
  return (
    <div className="flex justify-between h-14 mb-2">
      <NavLink
        to="/"
        className="flex cursor-pointer decoration-none justify-center items-center px-4 bg-amber-4 hover:( bg-green-4 text-zinc-9 ) rounded-b-md transition-all duration-200 text-coolgray-8 font-mono text-2xl"
      >
        XBlog
      </NavLink>
      <ul className="flex">
        {isAuthenticated ? (
          <div className="flex justify-center items-center text-xl text-fuchsia-5 gap-1 mx-2 cursor-default">
            Logged in as{" "}
            <NavLink
              to="/dashboard"
              className="text-amber-5 decoration-none animate-pulse font-bold"
            >
              {user.username}
            </NavLink>
          </div>
        ) : (
          <div className="flex justify-center items-center cursor-default text-fuchsia-5 text-lg animate-pulse mx-2">
            Empty space ＼(^o^)／
          </div>
        )}
        <NavLink
          to={isAuthenticated ? "/dashboard" : "/auth"}
          className="flex h-full items-center px-6 decoration-none text-emerald-6 text-lg rounded-b-lg hover:( bg-gray-9 text-emerald-3 ) transition-all"
        >
          {isAuthenticated ? "Dashboard" : "Login"}
        </NavLink>
        {isAuthenticated && (
          <button
            className="border-none bg-zinc-8 text-emerald-6 text-lg px-6 rounded-b-lg cursor-pointer hover:( bg-gray-9 text-emerald-3 ) transition-all"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
