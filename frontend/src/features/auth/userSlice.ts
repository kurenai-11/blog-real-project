import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GetUserDataResponse } from "../api/apiSlice";
import { User } from "../../app/types";

export type AuthData = {
  authenticated: boolean;
  username: string;
  auth: {
    authKey: string;
    validUntil: string;
  };
  code: number;
};

export type userState = AuthData & User;

const initialState: userState = {
  authenticated: false,
  username: "",
  auth: { authKey: "", validUntil: "" },
  code: -1,
  _id: -1,
  avatarUrl: "",
  creationDate: "",
  blogs: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeLogin: (state, action: PayloadAction<AuthData>) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, ...action.payload };
    },
    logout: () => {
      localStorage.removeItem("user");
      return initialState;
    },
    storeUserData: (state, action: PayloadAction<GetUserDataResponse>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { storeLogin, logout, storeUserData } = userSlice.actions;

export default userSlice.reducer;
