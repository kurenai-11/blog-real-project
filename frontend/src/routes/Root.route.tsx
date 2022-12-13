import { Outlet } from "react-router-dom";
import MainPage from "../features/main-page/MainPage.component";
import Footer from "../features/shared/Footer.component";
import Navbar from "../features/shared/Navbar.component";

const RootRoute = () => {
  return (
    <div className="bg-gray-8 min-h-screen text-zinc-3 flex flex-col">
      <Navbar />
      <MainPage />
      <Footer />
    </div>
  );
};

export default RootRoute;
