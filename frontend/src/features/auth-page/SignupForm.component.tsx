import { IoIosLogIn } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { login } from "../auth/userSlice";
import FormButton from "./FormButton.component";
import FormInput from "./FormInput.component";
import {
  AuthCodes,
  formClasses,
  formContainerClasses,
  formInfoClasses,
  processForm,
} from "./shared";

const SignupForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const authData = await processForm(formData);
    if (authData.code === AuthCodes.SUCCESSFUL_LOGIN_NOAUTHKEY) {
      dispatch(login(authData));
      navigate("/dashboard");
    } else {
      // display that the signup is unsuccessful and why
      console.log("error while creating user account, code: ", authData.code);
    }
  };
  return (
    <div className={formContainerClasses}>
      <div className={[formInfoClasses, "bg-emerald-8"].join(" ")}>SIGNUP</div>
      <form onSubmit={submitHandler} className={formClasses}>
        <FormInput type="text" name="username" placeholder="Login" />
        <FormInput type="password" name="password" placeholder="Password" />
        <FormInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
        />
        <FormButton type="submit">
          <IoIosLogIn />
          Signup
        </FormButton>
      </form>
    </div>
  );
};

export default SignupForm;
