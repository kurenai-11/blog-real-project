import { NavLink } from "react-router-dom";
import { useAppSelector, useAuthenticated } from "../../app/hooks";

const Navbar = () => {
  const user = useAppSelector((state) => state.user);
  const isAuthenticated = useAuthenticated();
  return (
    <div className="flex justify-between h-14 mb-2">
      <NavLink
        to="/"
        className="flex cursor-pointer decoration-none justify-center items-center px-4 bg-amber-4 hover:( bg-green-4 text-zinc-9 ) rounded-b-md transition-all duration-200 text-coolgray-8 font-mono text-2xl"
      >
        XBlog
      </NavLink>
      {isAuthenticated ? (
        <div className="flex justify-center items-center text-xl text-fuchsia-5">
          Logged in as {user.username}
        </div>
      ) : (
        <div className="flex justify-center items-center cursor-default text-fuchsia-5 text-lg animate-pulse">
          Empty space ＼(^o^)／
        </div>
      )}
      <ul className="flex">
        <NavLink
          to={isAuthenticated ? "/dashboard" : "/auth"}
          className="flex h-full items-center px-6 decoration-none text-emerald-6 text-lg rounded-b-lg hover:( bg-gray-9 text-emerald-3 ) transition-all"
        >
          {isAuthenticated ? "Dashboard" : "Login"}
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
