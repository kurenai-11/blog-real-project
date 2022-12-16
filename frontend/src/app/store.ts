import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import userReducer from "../features/auth/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
