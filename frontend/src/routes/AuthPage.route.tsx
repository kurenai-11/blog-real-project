import { redirect } from "react-router-dom";
import AuthPage from "../components/auth-page/AuthPage.component";

type AuthPageProps = {
  isLoggedIn?: boolean;
  loginPage?: boolean;
};

const AuthPageRoute = ({
  isLoggedIn = false,
  loginPage = true,
}: AuthPageProps) => {
  if (isLoggedIn) {
    // todo: redirect to existing user profile
    redirect("/");
  }
  return loginPage ? <AuthPage page="signup" /> : <AuthPage page="signup" />;
};

export default AuthPageRoute;
