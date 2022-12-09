import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer.component";
import Navbar from "../components/shared/Navbar.component";

const NavbarRoute = () => {
  return (
    <div className="bg-gray-8 h-screen text-zinc-3 flex flex-col">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default NavbarRoute;
