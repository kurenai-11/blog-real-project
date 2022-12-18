import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthDataResponse, userAuthCredentials } from "../auth-page/shared";

type CreateBlogResponse = {
  status: "success" | "fail";
  error?: string;
  blogId?: string;
};
// Data we will receive after querying for blog data
// with the blog id
export type GetBlogDataResponse = {
  status: "success" | "fail";
  error?: string;
  blogId?: string;
  title?: string;
  description?: string;
  authorName?: string;
  authorId?: string;
  // for now
  posts?: any[];
};
export type GetUserDataResponse = {
  status: "success" | "fail";
  error?: string;
  blogs?: any[];
  user?: {
    avatarUrl: string;
    creationDate: Date;
    userId: number;
    username: string;
  };
};
// data to send to the server to create a blog
type CreateBlogData = {
  title: string;
  description: string;
  authKey: string;
  userId: number;
};
// data to send to the server to get blog's data by blog's id
type GetBlogDataByBlogIdRequest = {
  blogId?: string;
  // optional, to be able to retrieve personal private blogs later
  authKey?: string;
};
// data to send to the server to get a certain user's list of blogs
type GetAuthenticatedUserDataRequest = {
  authorId?: number;
  authKey?: string;
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
    createBlog: builder.mutation<CreateBlogResponse, CreateBlogData>({
      query: (createBlogData) => ({
        url: "blog",
        method: "POST",
        body: createBlogData,
      }),
    }),
    getBlogDataByBlogId: builder.query<
      GetBlogDataResponse,
      GetBlogDataByBlogIdRequest
    >({
      query: ({ blogId, authKey }) => ({
        url: `blog/${blogId}`,
        method: "GET",
        body: { authKey },
      }),
    }),
    getAuthenticatedUserData: builder.query<
      GetUserDataResponse,
      GetAuthenticatedUserDataRequest
    >({
      query: ({ authorId, authKey }) => ({
        url: `user/${authorId}`,
        method: "POST",
        body: { authKey },
      }),
    }),
    // unauthenticated version
    getUserData: builder.query<
      GetUserDataResponse,
      GetAuthenticatedUserDataRequest
    >({
      query: ({ authorId }) => ({
        url: `user/${authorId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginCMutation,
  useSignupMutation,
  useCreateBlogMutation,
  useGetAuthenticatedUserDataQuery,
  useGetUserDataQuery,
  useGetBlogDataByBlogIdQuery,
} = apiSlice;
