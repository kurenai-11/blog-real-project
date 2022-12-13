import { redirect, useNavigate } from "react-router-dom";
import FormButton from "./FormButton.component";
import FormInput from "./FormInput.component";
import { IoIosLogIn } from "react-icons/io";
import {
  formContainerClasses,
  formInfoClasses,
  formClasses,
  processForm,
  AuthCodes,
} from "./shared";
import { useAppDispatch } from "../../app/hooks";
import { login } from "../auth/userSlice";
import { useCookies } from "react-cookie";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [_, setCookie] = useCookies(["user"]);
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const authData = await processForm(formData);
    if (authData.code === AuthCodes.SUCCESSFUL_LOGIN_NOAUTHKEY) {
      dispatch(login(authData));
      setCookie("user", authData);
      navigate("/dashboard");
    } else {
      // display that the login is unsuccessful and why
      console.log("error while login, code: ", authData.code);
    }
  };
  return (
    <div className={formContainerClasses}>
      <div className={[formInfoClasses, "bg-cyan-8"].join(" ")}>LOGIN</div>
      <form onSubmit={submitHandler} className={formClasses}>
        <FormInput type="text" name="username" placeholder="Login" />
        <FormInput type="password" name="password" placeholder="Password" />
        <FormButton type="submit">
          <IoIosLogIn />
          Login
        </FormButton>
      </form>
    </div>
  );
};

export default LoginForm;
