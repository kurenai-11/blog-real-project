import { useNavigate } from "react-router-dom";
import FormButton from "./FormButton.component";
import LoginForm from "./LoginForm.component";
import SignupForm from "./SignupForm.component";
import { IoMdArrowBack } from "react-icons/io";
import { HiSwitchHorizontal } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useAppDispatch } from "../../app/hooks";
import { AuthData, login } from "../auth/userSlice";

const AuthPages = {
  login: "login",
  signup: "signup",
} as const;

type AuthPageProps = {
  page: keyof typeof AuthPages;
};

const AuthPage = ({ page }: AuthPageProps) => {
  const navigate = useNavigate();
  const [form, setForm] = useState(page);
  const isLogin = form === "login";
  return (
    <div className="min-h-screen bg-gray-8 flex flex-col justify-center items-center">
      {isLogin ? <LoginForm /> : <SignupForm />}
      <FormButton
        type="button"
        onClick={() => {
          isLogin ? setForm("signup") : setForm("login");
        }}
      >
        <HiSwitchHorizontal />
        {isLogin ? "Signup?" : "Login?"}
      </FormButton>
      <FormButton type="button" onClick={() => navigate("/")}>
        <IoMdArrowBack />
        Return
      </FormButton>
    </div>
  );
};

export default AuthPage;
