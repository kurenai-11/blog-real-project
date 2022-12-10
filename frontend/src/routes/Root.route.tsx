import { Outlet } from "react-router-dom";
import Footer from "../features/shared/Footer.component";
import Navbar from "../features/shared/Navbar.component";

const NavbarRoute = () => {
  return (
    <div className="bg-gray-8 min-h-screen text-zinc-3 flex flex-col">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default NavbarRoute;
