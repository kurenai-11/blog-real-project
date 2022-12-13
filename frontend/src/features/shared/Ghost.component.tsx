// This is a renderless component that runs stuff
// regardless of the route.
import { useCookies } from "react-cookie";
import { useAppDispatch } from "../../app/hooks";
import { AuthData, login } from "../auth/userSlice";

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
