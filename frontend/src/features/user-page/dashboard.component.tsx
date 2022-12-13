import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../auth/userSlice";
import Cookies from "js-cookie";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { username } = user;
  const clickHandler = () => {
    dispatch(logout());
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
