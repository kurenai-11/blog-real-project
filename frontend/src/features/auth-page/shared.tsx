import axios, { AxiosError, AxiosResponse } from "axios";
// tsx extension is so the syntax highlighting for UnoCSS work
export const formContainerClasses = "flex flex-col";
export const formInfoClasses =
  "h-16 flex justify-center items-center text-zinc-1 text-2xl font-mono cursor-default bg-opacity-50 rounded-2 my-6";
export const formClasses = "flex flex-col";

export type Action = {
  request: Request;
};

export type authUser = {
  username: string;
  password: string;
  confirmPassword?: string;
};

export type AuthDataResponse = {
  username: string;
  auth: {
    authKey: string;
    validUntil: Date;
  };
  successful: boolean;
  code?: number;
};

export const processForm = async (request: Request) => {
  const userData = await request.formData();
  const username = userData.get("username")?.toString();
  const password = userData.get("password")?.toString();
  const confirmPassword = userData.get("confirmPassword")?.toString();
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
        console.log("successfully signed in");
        const auth = response!.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 409) {
            console.error("Account already exists");
            // todo: change ui accordingly
          }
        } else {
          console.error("unkown error while creating a new user account");
          console.log("error :>> ", error);
        }
      }
      // else login
    } else {
      user = { username, password };
      try {
        response = await axios.post("http://127.0.0.1:5000/auth", {
          ...user,
          action: "login",
        });
        // we know that it is not undefined because we handle the error
        const auth = response!.data;
        if (!auth.successful) {
          console.error("wrong login or password");
        }
        // todo: handle codes 11 and 12
        if (auth.code === 10) {
          // to save authentication in cookies and application wide state here
          console.log("successfully logged in");
        } else if (auth.code === 11) {
          console.error("login failed, auth key invalid");
        } else if (auth.code === 12) {
          console.error("login failed, auth key expired");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("axios error: ");
        } else {
          console.log("unknown erorr:");
        }
        console.error(error);
      }
    }
  }
};
