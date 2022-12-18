import Footer from "./Footer.component";
import Navbar from "./Navbar.component";

type RootProps = {
  children: React.ReactNode;
};

// called root because I don't know how to better name it
const Root = ({ children }: RootProps) => {
  return (
    <div className="bg-zinc-8 min-h-screen text-zinc-3 flex flex-col">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Root;
