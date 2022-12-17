import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthDataResponse, userAuthCredentials } from "../auth-page/shared";

type CreateBlogResponse = {
  status: "success" | "fail";
  error?: string;
  blogId?: string;
};
type CreateBlogData = {
  title: string;
  description: string;
  authKey: string;
  userId: number;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
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
    createBlog: builder.mutation<CreateBlogResponse, CreateBlogData>({
      query: (createBlogData) => ({
        url: "blog",
        method: "POST",
        body: createBlogData,
      }),
    }),
  }),
});

export const { useLoginCMutation, useSignupMutation, useCreateBlogMutation } =
  apiSlice;
