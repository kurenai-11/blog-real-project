import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticated } from "../app/hooks";
import Dashboard from "../features/user-page/dashboard.component";

const DashboardRoute = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthenticated();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated]);
  return <Dashboard />;
};

export default DashboardRoute;
