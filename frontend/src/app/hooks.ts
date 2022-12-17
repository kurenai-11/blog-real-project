import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuthenticated = () =>
  useAppSelector((state) => state.user.authenticated);

export const useAuthKey = () =>
  useAppSelector((state) => state.user.auth?.authKey);
