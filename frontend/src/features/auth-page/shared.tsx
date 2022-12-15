// tsx extension is so the syntax highlighting for UnoCSS work
import axios, { AxiosResponse } from "axios";
import { AuthData } from "../auth/userSlice";
export const formContainerClasses = "flex flex-col w-full items-center";
export const formInfoClasses =
  "h-16 w-72 flex justify-center items-center text-zinc-1 text-2xl font-mono cursor-default bg-opacity-50 rounded-2 my-6";
export const formClasses = "flex flex-col w-72";

export type authUser = {
  username: string;
  password: string;
  confirmPassword?: string;
};

export type AuthDataResponse = {
  username?: string;
  auth?: {
    authKey: string;
    validUntil: Date;
  };
  code: number;
};

export enum AuthCodes {
  SUCCESSFUL_SIGNUP,
  // login by authkey ↓
  SUCCESSFUL_LOGIN_AUTHKEY,
  // login by login and password, returns authkey ↓
  SUCCESSFUL_LOGIN_NOAUTHKEY,
  SIGNUP_ACCOUNT_EXISTS,
  SIGNUP_AXIOS_UNKNOWN,
  SIGNUP_CLIENT_UNKNOWN,
  SIGNUP_SERVER_UNKNOWN,
  LOGIN_WRONG,
  LOGIN_AUTH_KEY_FAIL,
  LOGIN_AUTH_KEY_EXPIRED,
  LOGIN_AXIOS_UNKNOWN,
  LOGIN_UNKNOWN,
  SERVER_WRONG_DATA,
  CLIENT_INPUT_INVALID,
}

export const processForm = async (formData: FormData): Promise<AuthData> => {
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();
  // todo: do **proper** validation
  if (username && password) {
    let user: authUser;
    let response: AxiosResponse<AuthDataResponse> | null = null;
    // if signup
    if (confirmPassword) {
      user = { username, password, confirmPassword };
      try {
        response = await axios.post("http://127.0.0.1:5000/auth", {
          ...user,
          action: "signup",
        });
        // save authentication in cookies and application wide state here
        // we are handling the error if it happens so we know that
        // auth will not be undefined, so we use !
        const auth = response!.data;
        return {
          ...auth,
          authenticated: true,
          code: AuthCodes.SUCCESSFUL_SIGNUP,
        };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 409) {
            return {
              authenticated: false,
              code: AuthCodes.SIGNUP_ACCOUNT_EXISTS,
            };
          }
          return {
            authenticated: false,
            code: AuthCodes.SIGNUP_CLIENT_UNKNOWN,
          };
        } else {
          return {
            authenticated: false,
            code: AuthCodes.SIGNUP_SERVER_UNKNOWN,
          };
        }
      }
      // else login
    } else {
      user = { username, password };
      try {
        response = await axios.post("http://127.0.0.1:5000/auth", {
          ...user,
          action: "login_noauthkey",
        });
        // we know that it is not undefined because we handle the error
        const auth = response!.data;
        if (auth.code === AuthCodes.LOGIN_WRONG) {
          return { authenticated: false, code: AuthCodes.LOGIN_WRONG };
        }
        if (auth.code === AuthCodes.SUCCESSFUL_LOGIN_NOAUTHKEY) {
          return {
            ...auth,
            authenticated: true,
            code: AuthCodes.SUCCESSFUL_LOGIN_NOAUTHKEY,
          };
        }
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          return { authenticated: false, code: AuthCodes.LOGIN_AXIOS_UNKNOWN };
        } else {
          return { authenticated: false, code: AuthCodes.LOGIN_UNKNOWN };
        }
      }
    }
  }
  return { authenticated: false, code: AuthCodes.CLIENT_INPUT_INVALID };
};
