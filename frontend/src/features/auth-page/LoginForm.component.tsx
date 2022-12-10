import { Form, redirect } from "react-router-dom";
import FormButton from "./FormButton.component";
import FormInput from "./FormInput.component";
import { IoIosLogIn } from "react-icons/io";
import { formContainerClasses, formInfoClasses, formClasses } from "./shared";

export type Action = {
  request: Request;
};

export const action = async ({ request }: Action) => {
  const formData = await request.formData();
  return redirect("/auth");
};

const LoginForm = () => {
  return (
    <div className={formContainerClasses}>
      <div className={[formInfoClasses, "bg-cyan-8"].join(" ")}>LOGIN</div>
      <Form method="post" action="login" className={formClasses}>
        <FormInput type="text" name="login" placeholder="Login" />
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
