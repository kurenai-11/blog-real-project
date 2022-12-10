import { NavLink } from "react-router-dom";

const Navbar = () => {
  const links = {
    account: "/auth",
    test1: "/test1",
    test2: "/test2",
    test3: "/test3",
  };
  return (
    <div className="flex justify-between h-14 mb-2">
      {/* Logo  */}
      <NavLink
        to="/"
        className="flex cursor-pointer decoration-none justify-center items-center px-4 bg-amber-4 hover:( bg-green-4 text-zinc-9 ) rounded-b-md transition-all duration-200 text-coolgray-8 font-mono text-2xl"
      >
        XBlog
      </NavLink>
      <div className="flex justify-center items-center cursor-default text-fuchsia-5 text-lg animate-pulse">
        Empty space ＼(^o^)／
      </div>
      <ul className="flex">
        {Object.entries(links).map((link) => {
          return (
            <NavLink
              to={link[1]}
              key={link[0]}
              className="flex h-full items-center px-6 decoration-none text-emerald-6 text-lg rounded-b-lg hover:( bg-gray-9 text-emerald-3 ) transition-all"
            >
              {link[0][0].toUpperCase() + link[0].slice(1)}
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
};

export default Navbar;
