import { Blog } from "../../app/types";

type BlogListProps = {
  blogs: Blog[];
};

const BlogList = ({ blogs }: BlogListProps) => {
  return (
    <div className="w-full h-full">
      <div></div>
    </div>
  );
};

export default BlogList;
