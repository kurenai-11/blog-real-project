import Footer from "../features/shared/Footer.component";
import Navbar from "../features/shared/Navbar.component";

const BlogsRoute = () => {
  return (
    <div className="bg-zinc-8">
      <Navbar />
      <div className="h-140 flex flex-col justify-center items-center text-zinc-2 text-xl">
        Blogs
      </div>
      <Footer />
    </div>
  );
};

export default BlogsRoute;
