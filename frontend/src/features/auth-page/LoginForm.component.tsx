import { Form, redirect } from "react-router-dom";
import FormButton from "./FormButton.component";
import FormInput from "./FormInput.component";
import { IoIosLogIn } from "react-icons/io";
import {
  formContainerClasses,
  formInfoClasses,
  formClasses,
  processForm,
} from "./shared";
import { Action } from "./shared";

export const action = async ({ request }: Action) => {
  await processForm(request);
  return redirect("/auth");
};

const LoginForm = () => {
  return (
    <div className={formContainerClasses}>
      <div className={[formInfoClasses, "bg-cyan-8"].join(" ")}>LOGIN</div>
      <Form method="post" action="login" className={formClasses}>
        <FormInput type="text" name="username" placeholder="Login" />
        <FormInput type="password" name="password" placeholder="Password" />
        <FormButton type="submit">
          <IoIosLogIn />
          Login
        </FormButton>
      </Form>
    </div>
  );
};

export default LoginForm;
