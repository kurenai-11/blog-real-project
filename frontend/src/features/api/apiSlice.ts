import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthDataResponse, userAuthCredentials } from "../auth-page/shared";

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
  }),
});

export const { useLoginCMutation, useSignupMutation } = apiSlice;
