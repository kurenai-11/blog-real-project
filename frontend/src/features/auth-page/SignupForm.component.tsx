import axios from "axios";
import { IoIosLogIn } from "react-icons/io";
import { Form, redirect } from "react-router-dom";
import FormButton from "./FormButton.component";
import FormInput from "./FormInput.component";
import {
  authUser,
  formClasses,
  formContainerClasses,
  formInfoClasses,
  processForm,
} from "./shared";
import { Action } from "./shared";

export const action = async ({ request }: Action) => {
  await processForm(request);
  return redirect("/auth");
};

const SignupForm = () => {
  return (
    <div className={formContainerClasses}>
      <div className={[formInfoClasses, "bg-emerald-8"].join(" ")}>SIGNUP</div>
      <Form method="post" action="signup" className={formClasses}>
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
      </Form>
    </div>
  );
};

export default SignupForm;
