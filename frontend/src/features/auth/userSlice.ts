import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export type AuthData = {
  authenticated: boolean;
  username?: string;
  auth?: {
    authKey: string;
    validUntil: Date;
  };
  code?: number;
};

export type UserData = {
  blogs?: [];
};

export type userState = AuthData & UserData;

const initialState: userState = { authenticated: false };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (_, action: PayloadAction<AuthData>) => {
      Cookies.set("user", JSON.stringify({ ...action.payload }));
      return { ...action.payload };
    },
    logout: () => {
      Cookies.remove("user");
      return { authenticated: false };
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
