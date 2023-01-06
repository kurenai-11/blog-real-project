import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Blog, Post, User } from "../../app/types";
import { AuthDataResponse, userAuthCredentials } from "../auth-page/shared";

type CreateBlogResponse =
  | { status: "fail"; error: string }
  | {
      status: "success";
      blogId: number;
    };
type EditBlogResponse =
  | { status: "fail"; error: string }
  | { status: "success"; blogId: number };
type DeleteBlogResponse =
  | { status: "fail"; error: string }
  | { status: "success" };
type CreatePostResponse =
  | { status: "fail"; error: string }
  | { status: "success"; post: Post };
type DeletePostResponse =
  | { status: "fail"; error: string }
  | {
      status: "success";
    };
type EditPostResponse =
  | { status: "fail"; error: string }
  | { status: "success" };
type GetBlogListResponse = {
  status: "success";
  blogs: Blog[];
};
// Data we will receive after querying for blog data
// with the blog id
export type GetBlogDataResponse =
  | { status: "fail"; error: string }
  | {
      status: "success";
      _id: number;
      title: string;
      description: string;
      authorName: string;
      authorId: number;
      posts: Post[];
      creationDate: string;
    };
type GetBlogListRequest = {
  blogLimit: number;
  postLimit: number;
};
export type GetUserDataResponse =
  | { status: "fail"; error: string }
  | {
      status: "success";
      blogs: Blog[];
      user: User;
    };
// data to send to the server to create a blog
type CreateEditBlogData = {
  title: string;
  description: string;
  authKey: string;
  userId: number;
  blogId?: number;
};
type DeleteBlogRequest = {
  authKey: string;
  userId: number;
  blogId: number;
};
type CreatePostRequest = {
  title: string;
  content: string;
  authKey: string;
  userId: number;
  blogId: number;
};
type DeletePostRequest = {
  authKey: string;
  userId: number;
  postId: number;
};
type EditPostRequest = {
  title: string;
  content: string;
  authKey: string;
  userId: number;
  postId: number;
};
// data to send to the server to get blog's data by blog's id
type GetBlogDataByBlogIdRequest = {
  blogId: number;
  // optional, to be able to retrieve personal private blogs later
  authKey?: string;
};
// data to send to the server to get a certain user's list of blogs
type GetAuthenticatedUserDataRequest = {
  userId: number;
  authKey: string;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["blogs", "posts", "user"],
  endpoints: (builder) => ({
    // Auth related
    // loginC == login by credentials
    loginC: builder.mutation<AuthDataResponse, userAuthCredentials>({
      query: (userCredentials) => ({
        url: "auth",
        method: "POST",
        body: { ...userCredentials, action: "login_noauthkey" },
      }),
    }),
    signup: builder.mutation<AuthDataResponse, userAuthCredentials>({
      query: (userCredentials) => ({
        url: "auth",
        method: "POST",
        body: { ...userCredentials, action: "signup" },
      }),
    }),
    // blog related
    createBlog: builder.mutation<CreateBlogResponse, CreateEditBlogData>({
      query: (createBlogData) => ({
        url: "blog",
        method: "POST",
        body: createBlogData,
      }),
      invalidatesTags: ["blogs"],
    }),
    editBlog: builder.mutation<EditBlogResponse, CreateEditBlogData>({
      query: (editBlogData) => ({
        url: "blog",
        method: "PATCH",
        body: { ...editBlogData },
      }),
      invalidatesTags: ["blogs"],
    }),
    deleteBlog: builder.mutation<DeleteBlogResponse, DeleteBlogRequest>({
      query: (deleteBlogData) => ({
        url: "blog",
        method: "DELETE",
        body: deleteBlogData,
      }),
      invalidatesTags: ["blogs"],
    }),
    createPost: builder.mutation<CreatePostResponse, CreatePostRequest>({
      query: (createPostData) => ({
        url: "blog",
        method: "PUT",
        body: createPostData,
      }),
      invalidatesTags: ["posts"],
    }),
    // delete post
    deletePost: builder.mutation<DeletePostResponse, DeletePostRequest>({
      query: (deletePostData) => ({
        url: "post",
        method: "DELETE",
        body: deletePostData,
      }),
      invalidatesTags: ["posts"],
    }),
    // edit post
    editPost: builder.mutation<EditPostResponse, EditPostRequest>({
      query: (editPostData) => ({
        url: "post",
        method: "PATCH",
        body: editPostData,
      }),
      invalidatesTags: ["posts"],
    }),
    getBlogDataByBlogId: builder.query<
      GetBlogDataResponse,
      GetBlogDataByBlogIdRequest
    >({
      query: ({ blogId }) => ({
        url: `blog/${blogId}`,
        method: "GET",
      }),
      providesTags: ["posts"],
    }),
    // get blog list
    getBlogList: builder.query<GetBlogListResponse, GetBlogListRequest>({
      query: (getBlogListData) => ({
        url: "blog",
        method: "GET",
        params: getBlogListData,
      }),
      providesTags: ["blogs"],
    }),
    // user related
    getAuthenticatedUserData: builder.query<
      GetUserDataResponse,
      GetAuthenticatedUserDataRequest
    >({
      query: ({ userId, authKey }) => ({
        url: `user/${userId}`,
        method: "POST",
        body: { authKey },
      }),
      providesTags: ["blogs"],
    }),
    // unauthenticated version
    getUserData: builder.query<
      GetUserDataResponse,
      GetAuthenticatedUserDataRequest
    >({
      query: ({ userId }) => ({
        url: `user/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginCMutation,
  useSignupMutation,
  useCreateBlogMutation,
  useEditBlogMutation,
  useGetAuthenticatedUserDataQuery,
  useGetUserDataQuery,
  useGetBlogDataByBlogIdQuery,
  useGetBlogListQuery,
  useDeleteBlogMutation,
  useCreatePostMutation,
  useDeletePostMutation,
  useEditPostMutation,
} = apiSlice;
