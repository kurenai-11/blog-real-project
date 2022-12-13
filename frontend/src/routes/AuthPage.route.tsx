import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticated } from "../app/hooks";
import AuthPage from "../features/auth-page/AuthPage.component";

type AuthPageProps = {
  isLoggedIn?: boolean;
  loginPage?: boolean;
};

const AuthPageRoute = ({
  isLoggedIn = false,
  loginPage = true,
}: AuthPageProps) => {
  isLoggedIn = useAuthenticated();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, []);
  return loginPage ? <AuthPage page="login" /> : <AuthPage page="signup" />;
};

export default AuthPageRoute;
