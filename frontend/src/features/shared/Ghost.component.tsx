// This is a renderless component that runs stuff
// regardless of the route.
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useAppDispatch, useAuthenticated } from "../../app/hooks";
import { AuthData, login, logout } from "../auth/userSlice";

const Ghost = () => {
  const [cookies] = useCookies(["user"]);
  const dispatch = useAppDispatch();
  if (cookies.user) {
    // todo: properly validate cookies.user
    dispatch(login(cookies.user as AuthData));
  }
  return <></>;
};

export default Ghost;
