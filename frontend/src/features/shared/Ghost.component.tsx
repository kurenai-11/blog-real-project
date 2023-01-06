// This is a renderless component that runs stuff
// regardless of the route.
import { useAppDispatch } from "../../app/hooks";
import { AuthData, storeLogin } from "../auth/userSlice";

const Ghost = () => {
  const dispatch = useAppDispatch();
  let persistedAuth: AuthData | undefined;
  const userData = localStorage.getItem("user");
  if (userData !== null) {
    persistedAuth = JSON.parse(userData) as AuthData;
    dispatch(storeLogin(persistedAuth));
  }
  return <></>;
};

export default Ghost;
