import { z } from "zod";

export const ZUsernameInput = z.string().min(4).max(20);
export const upperCasePattern = /[A-Z]/;
export const lowerCasePattern = /[a-z]/;
export const ZPasswordInput = z
  .string()
  .min(6)
  .max(64)
  .refine(
    (password) => password.match(upperCasePattern) !== null,
    "Password should contain at least one uppercase letter"
  )
  .refine(
    (password) => password.match(lowerCasePattern) !== null,
    "Password should contain at least one lowercase letter"
  );
export const ZSignupForm = z
  .object({
    username: ZUsernameInput,
    password: ZPasswordInput,
    confirmPassword: ZPasswordInput,
  })
  .refine(
    (values) => values.password === values.confirmPassword,
    "Confirm password must equal password"
  );

export const ZLoginForm = z.object({
  username: ZUsernameInput,
  password: ZPasswordInput,
});
