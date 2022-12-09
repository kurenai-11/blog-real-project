import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar.component";

const NavbarRoute = () => {
  return (
    <div className="bg-slate-9 h-screen text-zinc-3 flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default NavbarRoute;
