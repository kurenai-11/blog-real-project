import { useEffect } from "react";
import { useGetBlogListQuery } from "../features/api/apiSlice";
import Footer from "../features/shared/Footer.component";
import Navbar from "../features/shared/Navbar.component";

const BlogsRoute = () => {
  const { data, isLoading, isSuccess } = useGetBlogListQuery({
    blogLimit: 5,
    postLimit: 1,
  });
  const areThereBlogs = data
    ? data.status === "success"
      ? true
      : false
    : false;
  useEffect(() => {
    console.log("data :>> ", data);
  }, [data]);
  return (
    <div className="bg-zinc-8">
      <Navbar />
      <div className="flex flex-col items-center text-zinc-2 text-xl">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Blogs
        </h1>
        {areThereBlogs && (
          <div>
            <p className="mt-2 text-lg text-zinc-500">
              Here are {data!.blogs.length} recently created blogs:
            </p>
            <ul>
              {data!.blogs.map((blog) => (
                <li key={blog._id}>{blog.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BlogsRoute;
