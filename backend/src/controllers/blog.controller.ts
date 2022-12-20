import { Blog } from "../models/blog.model.js";
import { Post } from "../models/post.model.js";

export const getBlogsByUserId = async (authorId: number) => {
  const result = await Blog.find({ authorId });
  return result;
};

export const getBlodDataByBlogId = async (
  blogId: number,
  postLimit: number = 10
) => {
  const foundBlog = await Blog.findOne(
    { _id: blogId },
    { posts: { $slice: postLimit } }
  ).populate("posts");
  if (!foundBlog) {
    return null;
  }
  const blogData = foundBlog.toJSON();
  blogData.posts = [...blogData.posts].reverse();
  return blogData;
};

export const deleteBlogPosts = async (posts: number[]) => {
  await Post.deleteMany({ _id: { $in: posts } });
};
