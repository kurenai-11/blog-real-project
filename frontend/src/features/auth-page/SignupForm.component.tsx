import { IoIosLogIn } from "react-icons/io";
import { Form } from "react-router-dom";
import FormButton from "./FormButton.component";
import FormInput from "./FormInput.component";
import { formClasses, formContainerClasses, formInfoClasses } from "./shared";

const SignupForm = () => {
  return (
    <div className={formContainerClasses}>
      <div className={[formInfoClasses, "bg-emerald-8"].join(" ")}>SIGNUP</div>
      <Form method="post" action="signup" className={formClasses}>
        <FormInput type="text" name="login" placeholder="Login" />
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
