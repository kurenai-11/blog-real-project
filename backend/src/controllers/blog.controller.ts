import { Blog } from "../models/blog.model.js";

export const getBlogsByUserId = async (authorId: number) => {
  const result = await Blog.find({ authorId });
  return result;
};

export const getBlodDataByBlogId = async (blogId: number) => {
  const foundBlog = await Blog.findOne({ _id: blogId }).populate("posts");
  if (!foundBlog) {
    return null;
  }
  const blogData = foundBlog.toJSON();
  blogData.posts = [...blogData.posts].reverse();
  return blogData;
};
