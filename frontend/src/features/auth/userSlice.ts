import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { GetUserDataResponse } from "../api/apiSlice";
import { Blog } from "../../app/types";

export type AuthData = {
  authenticated: boolean;
  username?: string;
  userId?: number;
  auth?: {
    authKey: string;
    validUntil: Date;
  };
  code?: number;
};

export type UserData = {
  blogs?: Blog[];
  avatarUrl?: string;
};

export type userState = AuthData & UserData;

const initialState: userState = { authenticated: false };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeLogin: (_, action: PayloadAction<AuthData>) => {
      Cookies.set("user", JSON.stringify({ ...action.payload }));
      return { ...action.payload };
    },
    logout: () => {
      Cookies.remove("user");
      return { authenticated: false };
    },
    storeUserData: (state, action: PayloadAction<GetUserDataResponse>) => {
      return { ...state, ...action.payload.user, blogs: action.payload.blogs };
    },
  },
});

export const { storeLogin, logout, storeUserData } = userSlice.actions;

export default userSlice.reducer;
