import { useGetBlogListQuery } from "../features/api/apiSlice";
import BlogList from "../features/blog-list/BlogList.component";
import Loading from "../features/shared/Loading.component";

const BlogsRoute = () => {
  const { data } = useGetBlogListQuery({
    blogLimit: 5,
    postLimit: 1,
  });
  const areThereBlogs = data
    ? data.status === "success"
      ? true
      : false
    : false;
  return (
    <div className="bg-zinc-8">
      <div className="flex flex-col items-center text-zinc-2 text-xl">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Blogs
        </h1>
        {areThereBlogs ? (
          <div className="w-full my-2">
            <p className="text-center text-lg text-zinc-500">
              Here are {data!.blogs.length} recently created blogs:
            </p>
            <BlogList mode="list" blogs={data!.blogs} />
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default BlogsRoute;
