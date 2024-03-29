import { useParams } from "react-router-dom";
import { useGetBlogDataByBlogIdQuery } from "../features/api/apiSlice";
import BlogPage from "../features/blog-page/BlogPage.component";
import Loading from "../features/shared/Loading.component";
import PageNotExist from "./404.route";

const BlogRoute = () => {
  const { blogId } = useParams();
  const {
    data: blogData,
    isLoading,
    isSuccess,
  } = useGetBlogDataByBlogIdQuery({ blogId: Number(blogId) });
  // complicated logic but it basically means:
  // if isLoading display loading element
  // if not isSuccess - backend side error - request did not go through
  // if isSuccess, check if the request was actually successful with
  // blogData.status === "success", if it is not,
  // than the id in the url was not valid in the first place (manual user input etc)
  return isLoading ? (
    <Loading />
  ) : isSuccess ? (
    blogData.status === "success" ? (
      <BlogPage blog={blogData} />
    ) : (
      <PageNotExist />
    )
  ) : (
    <PageNotExist />
  );
};

export default BlogRoute;
