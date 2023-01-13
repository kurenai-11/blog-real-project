import { useNavigate } from "react-router-dom";
import FormButton from "./FormButton.component";
import FormInput from "./FormInput.component";
import { IoIosLogIn } from "react-icons/io";
import {
  formContainerClasses,
  formInfoClasses,
  formClasses,
  AuthCodes,
  AuthDataResponse,
} from "./shared";
import { useAppDispatch, useAuthenticated } from "../../app/hooks";
import { storeLogin } from "../auth/userSlice";
import { MdErrorOutline } from "react-icons/md";
import { useState } from "react";
import { ZLoginForm } from "../auth/zod";
import { useLoginCMutation } from "../api/apiSlice";
import { twMerge } from "tailwind-merge";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  // 0 - not yet attempted login
  // 1 - incorrect login or password
  // 2 - request error(no internet or stuff)
  const [loginCode, setLoginCode] = useState(0);
  // 0 - no interaction since last login attempt
  // 1 - did interact since last login attempt
  const [inputStatus, setInputStatus] = useState(0);
  const [loginByCredentials, { isLoading: isSubmittingLogin }] =
    useLoginCMutation();
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const [username, password] = [
      formData.get("username")?.toString(),
      formData.get("password")?.toString(),
    ];
    const loginData = ZLoginForm.safeParse({ username, password });
    if (!loginData.success) {
      // don't bother to submit the form if the data is incorrect
      setLoginCode(1);
      return;
    }
    // this is a very ugly way to deal with it, but it will do for the time being
    const authData = await loginByCredentials(loginData.data);
    if ((authData as { data: AuthDataResponse }).data) {
      const successfulAuthData = (authData as { data: AuthDataResponse }).data;
      dispatch(
        storeLogin({
          ...successfulAuthData,
          authenticated: true,
        })
      );
    } else {
      const failedAuthData = (
        (authData as { error: FetchBaseQueryError | SerializedError })
          .error as FetchBaseQueryError
      ).data as Partial<AuthDataResponse>;
      // display that the login is unsuccessful and why
      if (failedAuthData.code === AuthCodes.LOGIN_WRONG) {
        setLoginCode(1);
        setInputStatus(0);
      } else {
        setLoginCode(2);
      }
    }
  };
  return (
    <div className={formContainerClasses}>
      <div className={twMerge(formInfoClasses, "bg-cyan-8")}>LOGIN</div>
      <form onSubmit={submitHandler} className={formClasses}>
        <FormInput
          type="text"
          name="username"
          placeholder="Login"
          onChange={() => loginCode === 1 && setInputStatus(1)}
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          onChange={() => loginCode === 1 && setInputStatus(1)}
        />
        <div
          className={twMerge(
            "flex items-center text-red-7 font-bold text-center",
            (loginCode === 0 || inputStatus === 1) && "hidden"
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
