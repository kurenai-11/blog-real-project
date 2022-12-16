import { useNavigate } from "react-router-dom";
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
import { useAppDispatch, useAuthenticated } from "../../app/hooks";
import { login } from "../auth/userSlice";
import { withClasses } from "../shared/utils";
import { MdErrorOutline } from "react-icons/md";
import { useState } from "react";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // 0 - not yet attempted login
  // 1 - incorrect login or password
  // 2 - request error(no internet or stuff)
  const [loginCode, setLoginCode] = useState(0);
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const authData = await processForm(formData);
    if (authData.code === AuthCodes.SUCCESSFUL_LOGIN_NOAUTHKEY) {
      dispatch(login(authData));
      navigate("/dashboard");
    } else {
      // display that the login is unsuccessful and why
      if (authData.code === AuthCodes.LOGIN_WRONG) {
        setLoginCode(1);
      } else {
        setLoginCode(2);
      }
    }
  };
  return (
    <div className={formContainerClasses}>
      <div className={withClasses(formInfoClasses, "bg-cyan-8")}>LOGIN</div>
      <form onSubmit={submitHandler} className={formClasses}>
        <FormInput type="text" name="username" placeholder="Login" />
        <FormInput type="password" name="password" placeholder="Password" />
        <div
          className={withClasses(
            "flex items-center text-red-7 font-bold text-center",
            (loginCode === 0 || loginCode === 2) && "hidden"
          )}
        >
          <MdErrorOutline className="w-8 flex-shrink-0 h-full color-red-6" />
          {loginCode === 1 && "Incorrect login or password"}
          {loginCode === 2 && "Error while login, check internet connection"}
        </div>
        <FormButton type="submit">
          <IoIosLogIn />
          Login
        </FormButton>
      </form>
    </div>
  );
};

export default LoginForm;
