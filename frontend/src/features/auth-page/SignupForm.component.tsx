import { useEffect, useRef, useState } from "react";
import { IoIosLogIn } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { login } from "../auth/userSlice";
import { ZPasswordInput, ZSignupForm, ZUsernameInput } from "../auth/zod";
import { withClasses } from "../shared/utils";
import FormButton from "./FormButton.component";
import FormInput from "./FormInput.component";
import {
  AuthCodes,
  formClasses,
  formContainerClasses,
  formInfoClasses,
  processForm,
} from "./shared";
import { MdErrorOutline } from "react-icons/md";

const SignupForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isConfirmedPassword, setIsConfirmedPassword] = useState(false);
  // 0 - user did not yet input anything in the form
  // 1 - input happened
  const [usernameInputStatus, setUsernameInputStatus] = useState(0);
  const [passwordInputStatus, setPasswordInputStatus] = useState(0);
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirmPassword")?.toString();
    const isValidForm = ZSignupForm.safeParse({
      username,
      password,
      confirmPassword,
    }).success;
    if (!isValidForm) {
      console.log("form not valid");
      return;
    }
    const authData = await processForm(formData);
    if (authData.code === AuthCodes.SUCCESSFUL_SIGNUP) {
      dispatch(login(authData));
      navigate("/dashboard");
    } else {
      // display that the signup is unsuccessful and why
      console.log("error while creating user account, code: ", authData.code);
    }
  };
  useEffect(() => {
    // if it is a first render we will not check
    // validity of the user input
    setIsValidUsername(ZUsernameInput.safeParse(username).success);
  }, [username]);
  useEffect(() => {
    setIsValidPassword(ZPasswordInput.safeParse(password).success);
    setIsConfirmedPassword(password === confirmPassword);
  }, [password]);
  useEffect(() => {
    // we don't need to check it with zod here
    // because we already check the password above
    setIsConfirmedPassword(password === confirmPassword);
  }, [confirmPassword]);
  return (
    <div className={formContainerClasses}>
      <div className={withClasses(formInfoClasses, "bg-emerald-8")}>SIGNUP</div>
      <form onSubmit={submitHandler} className={formClasses}>
        <FormInput
          type="text"
          name="username"
          placeholder="Login"
          value={username}
          onChange={(e) => {
            setUsernameInputStatus(1);
            setUsername(e.target.value);
          }}
          additionalClasses={withClasses(
            isValidUsername && "bg-green-4 bg-opacity-40"
          )}
        />
        <div
          className={withClasses(
            "flex items-center text-red-7 font-bold text-center",
            (isValidUsername || usernameInputStatus === 0) && "hidden"
          )}
        >
          <MdErrorOutline className="w-8 flex-shrink-0 h-full color-red-6" />
          Username must be between 6 and 20 characters.
        </div>
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPasswordInputStatus(1);
            setPassword(e.target.value);
          }}
          additionalClasses={withClasses(
            isValidPassword && "bg-green-4 bg-opacity-40"
          )}
        />
        <div
          className={withClasses(
            "flex items-center text-red-7 font-bold text-center",
            (isValidPassword || passwordInputStatus === 0) && "hidden"
          )}
        >
          <MdErrorOutline className="w-8 flex-shrink-0 h-full color-red-6" />
          Password must be at least 6 characters long and include at least one
          lowercase and uppercase letter
        </div>
        <FormInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          additionalClasses={withClasses(
            isConfirmedPassword && password && "bg-green-4 bg-opacity-40"
          )}
        />
        <div
          className={withClasses(
            "flex items-center text-red-7 font-bold text-center",
            isConfirmedPassword && "hidden"
          )}
        >
          <MdErrorOutline className="w-8 flex-shrink-0 h-full color-red-6" />
          Password and confirm password should be identical
        </div>
        <FormButton type="submit">
          <IoIosLogIn />
          Signup
        </FormButton>
      </form>
    </div>
  );
};

export default SignupForm;
