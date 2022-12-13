import { useCookies } from "react-cookie";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../auth/userSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [_, __, removeCookie] = useCookies(["user"]);
  const { username } = user;
  const clickHandler = () => {
    dispatch(logout());
    removeCookie("user");
  };
  return (
    <div>
      <div>Dashboard</div>
      <div>Avatar</div>
      <div>Hello {username}!</div>
      <button onClick={clickHandler}>Log out</button>
    </div>
  );
};

export default Dashboard;
