import { useParams } from "react-router-dom";
import { useGetBlogDataByBlogIdQuery } from "../features/api/apiSlice";
import Root from "../features/shared/Root.component";
import PageNotExist from "./404.route";

const BlogRoute = () => {
  const { blogId } = useParams();
  const {
    data: blogData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBlogDataByBlogIdQuery({ blogId: Number(blogId) });
  // complicated logic but it basically means:
  // if isLoading display loading element
  // if not isSuccess - backend side error - request did not go through
  // if isSuccess, check if the request was actually successful with
  // blogData.status === "success", if it is not,
  // than the id in the url was not valid in the first place (manual user input etc)
  return isLoading ? (
    <div className="text-4xl text-zinc-2 h-screen w-screen flex justify-center items-center">
      Loading...
    </div>
  ) : isSuccess ? (
    blogData.status === "success" ? (
      <Root>
        <div>{blogData.title}</div>
      </Root>
    ) : (
      <PageNotExist />
    )
  ) : (
    <PageNotExist />
  );
};

export default BlogRoute;
