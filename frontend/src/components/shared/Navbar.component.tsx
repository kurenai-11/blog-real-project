import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const links = {
    home: "/",
    account: "/auth",
    test1: "/test1",
    test2: "/test2",
    test3: "/test3",
  };
  return (
    <ul className="flex">
      {Object.entries(links).map((link) => {
        return (
          <NavLink to={link[1]} key={link[0]}>
            {link[0][0].toUpperCase() + link[0].slice(1)}
          </NavLink>
        );
      })}
    </ul>
  );
};

export default Navbar;
