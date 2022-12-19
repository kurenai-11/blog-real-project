import { Blog } from "../../app/types";

const BlogPage = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <div>{blog.title}</div>
    </div>
  );
};

export default BlogPage;
