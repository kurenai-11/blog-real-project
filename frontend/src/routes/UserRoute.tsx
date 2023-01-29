import { useEffect } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import { useGetUserDataQuery } from "../features/api/apiSlice";
import Loading from "../features/shared/Loading.component";
import UserPage from "../features/user-page/UserPage";
import PageNotExist from "./404.route";

const UserRoute = () => {
  const { userId } = useParams();
  const { data: userData, isLoading } = useGetUserDataQuery({
    userId: Number(userId) ?? -1,
  });
  return isLoading ? (
    <Loading />
  ) : userData?.status === "success" ? (
    <UserPage user={userData.user} />
  ) : (
    <PageNotExist />
  );
};

export default UserRoute;
