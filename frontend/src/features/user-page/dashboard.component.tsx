import { useCookies } from "react-cookie";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../auth/userSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [_, __, removeCookie] = useCookies(["user"]);
  const clickHandler = () => {
    dispatch(logout());
    removeCookie("user");
  };
  return (
    <div>
      <div>Dashboard</div>
      <div>Avatar</div>
      <div>Username</div>
      <button onClick={clickHandler}>Log out</button>
    </div>
  );
};

export default Dashboard;
