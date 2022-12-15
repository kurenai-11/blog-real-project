// This is a renderless component that runs stuff
// regardless of the route.
import Cookies from "js-cookie";
import { useAppDispatch } from "../../app/hooks";
import { AuthData, login } from "../auth/userSlice";

const Ghost = () => {
  const dispatch = useAppDispatch();
  let cookie: AuthData | undefined;
  if (Cookies.get("user") !== undefined) {
    cookie = JSON.parse(Cookies.get("user") as string) as AuthData;
    dispatch(login(cookie));
  }
  return <></>;
};

export default Ghost;