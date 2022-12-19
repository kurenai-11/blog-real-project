// tsx extension is so the syntax highlighting for UnoCSS work
export const formContainerClasses = "flex flex-col w-full items-center";
export const formInfoClasses =
  "h-16 w-72 flex justify-center items-center text-zinc-1 text-2xl font-mono cursor-default bg-opacity-50 rounded-2 my-6";
export const formClasses = "flex flex-col w-72";

export type AuthDataResponse = {
  username: string;
  auth: {
    authKey: string;
    validUntil: string;
  };
  userId: number;
  code: number;
  error?: string;
};

export type userAuthCredentials = {
  username: string;
  password: string;
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
