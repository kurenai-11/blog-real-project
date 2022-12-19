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
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
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
    }),
    editBlog: builder.mutation<EditBlogResponse, CreateEditBlogData>({
      query: (editBlogData) => ({
        url: "blog",
        method: "PATCH",
        body: { ...editBlogData },
      }),
    }),
    getBlogDataByBlogId: builder.query<
      GetBlogDataResponse,
      GetBlogDataByBlogIdRequest
    >({
      query: ({ blogId }) => ({
        url: `blog/${blogId}`,
        method: "GET",
      }),
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
} = apiSlice;
