import { useEffect, useRef, useState } from "react";
import { IoIosLogIn } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { storeLogin } from "../auth/userSlice";
import { ZPasswordInput, ZSignupForm, ZUsernameInput } from "../auth/zod";
import FormButton from "./FormButton.component";
import FormInput from "./FormInput.component";
import {
  AuthCodes,
  formClasses,
  formContainerClasses,
  formInfoClasses,
} from "./shared";
import { MdErrorOutline } from "react-icons/md";
import { useSignupMutation } from "../api/apiSlice";
import { twMerge } from "tailwind-merge";

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
  // 0 - user did not submit the form yet
  // 1 - user already exists
  // 2 - other request problem(no internet etc.)
  const [signupStatus, setSignupStatus] = useState(0);
  const [existingUser, setExistingUser] = useState("");
  const [signup, { isLoading }] = useSignupMutation();
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const [username, password, confirmPassword] = [
      formData.get("username")?.toString(),
      formData.get("password")?.toString(),
      formData.get("confirmPassword")?.toString(),
    ];
    const signupData = ZSignupForm.safeParse({
      username,
      password,
      confirmPassword,
    });
    if (!signupData.success) {
      // don't bother to submit the form if the data is incorrect
      return;
    }
    const authData = await signup(signupData.data).unwrap();
    if (authData.code === AuthCodes.SUCCESSFUL_SIGNUP) {
      dispatch(storeLogin({ ...authData, authenticated: true }));
      navigate("/dashboard");
    } else {
      // display that the signup is unsuccessful and why
      if (authData.code === AuthCodes.SIGNUP_ACCOUNT_EXISTS) {
        setSignupStatus(1);
        setExistingUser(username!);
      } else {
        setSignupStatus(2);
      }
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
      <div className={twMerge(formInfoClasses, "bg-emerald-8")}>SIGNUP</div>
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
          additionalClasses={twMerge(
            isValidUsername &&
              username !== existingUser &&
              "bg-green-4 bg-opacity-40",
            username === existingUser &&
              signupStatus !== 0 &&
              "bg-red-4 bg-opacity-40"
          )}
        />
        <div
          className={twMerge(
            "flex items-center text-red-7 font-bold text-center",
            (isValidUsername || usernameInputStatus === 0) &&
              (signupStatus === 0 ||
                (signupStatus === 1 && username !== existingUser)) &&
              "hidden"
          )}
        >
          <MdErrorOutline className="w-8 flex-shrink-0 h-full color-red-6" />
          {!isValidUsername && "Username must be between 6 and 20 characters."}
          {signupStatus === 1 &&
            username === existingUser &&
            `User ${existingUser} already exists`}
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
          additionalClasses={twMerge(
            isValidPassword && "bg-green-4 bg-opacity-40"
          )}
        />
        <div
          className={twMerge(
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
          additionalClasses={twMerge(
            isConfirmedPassword && password && "bg-green-4 bg-opacity-40"
          )}
        />
        <div
          className={twMerge(
            "flex items-center text-red-7 font-bold text-center",
            isConfirmedPassword && "hidden"
          )}
        >
          <MdErrorOutline className="w-8 flex-shrink-0 h-full color-red-6" />
          {!isConfirmedPassword &&
            "Password and confirm password should be identical"}
          {signupStatus === 2 &&
            "Unknown error while creating a user, check your internet connection."}
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
