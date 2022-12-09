import { Link, NavLink } from "react-router-dom";

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
      <div className="flex cursor-default justify-center items-center px-4 bg-amber-4 hover:bg-green-4 transition-all text-coolgray-8 font-mono text-2xl">
        XBlog
      </div>
      <ul className="flex">
        {Object.entries(links).map((link) => {
          return (
            <NavLink
              to={link[1]}
              key={link[0]}
              className="flex h-full items-center px-6 decoration-none text-current text-lg hover:bg-gray-9 transition-all"
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
