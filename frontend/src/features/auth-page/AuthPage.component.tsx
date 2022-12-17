import { useNavigate } from "react-router-dom";
import FormButton from "./FormButton.component";
import LoginForm from "./LoginForm.component";
import SignupForm from "./SignupForm.component";
import { IoMdArrowBack } from "react-icons/io";
import { HiSwitchHorizontal } from "react-icons/hi";
import { useState } from "react";

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
    <div className="min-h-screen bg-zinc-8 flex flex-col justify-center items-center font-sans box-border">
      {isLogin ? <LoginForm /> : <SignupForm />}
      <FormButton
        type="button"
        additionalClasses={
          isLogin
            ? "bg-emerald-8 hover:(bg-emerald-9)"
            : "bg-cyan-8 hover:(bg-cyan-9)"
        }
        onClick={() => {
          isLogin ? setForm("signup") : setForm("login");
        }}
      >
        <HiSwitchHorizontal />
        {isLogin ? "Signup?" : "Login?"}
      </FormButton>
      <FormButton
        additionalClasses="bg-fuchsia-8 hover:(bg-fuchsia-9)"
        type="button"
        onClick={() => navigate("/")}
      >
        <IoMdArrowBack />
        Return
      </FormButton>
    </div>
  );
};

export default AuthPage;
